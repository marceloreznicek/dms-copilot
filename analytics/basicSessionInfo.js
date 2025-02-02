
function getClientIP(req) {
  // First check if req exists and has headers
  if (!req || !req.headers) {
      return "no_ip"; // or some default value
  }
  
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.headers['x-client-ip'] ||
         req.ip;
}

function getDeviceType(req) {
  const userAgent = req.headers['user-agent'] || '';
 
  // Normalize userAgent to lowercase for easier matching
  const ua = userAgent.toLowerCase();
 
  if (/ipad|tablet/i.test(ua)) {
    return 'Tablet';
  }
 
  if (/iphone/i.test(ua)) {
    return 'Iphone';
  }
 
  if (/android/i.test(ua)) {
    // Check if it's an Android tablet
    if (/tablet|nexus 7|nexus 10|xoom/i.test(ua)) {
      return 'Tablet';
    }
    return 'Android';
  }
 
  // Common desktop browsers
  if (/windows|macintosh|linux|ubuntu/i.test(ua) && !/mobile|tablet/i.test(ua)) {
    return 'Desktop';
  }
 
  return 'Other';
 }
 

module.exports = {getClientIP, getDeviceType}