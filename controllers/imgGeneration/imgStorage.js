const cloudinary = require("cloudinary");

async function uploadImage(imageUrl) {
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
  
  try {
    const result = await cloudinary.uploader.upload(imageUrl);
    // console.log("connectBucket >> result : " + result);
    return result;
  } catch (err) {
    console.error(err);
    throw err; // Added error propagation
  }
}

module.exports = {uploadImage}