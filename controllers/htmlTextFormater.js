function formatCampaignText(text) {
  // Split into sections by '---'
  const sections = text.split('---');
  let html = '<div class="campaign-container">';
  
  sections.forEach((section, index) => {
    const lines = section.trim().split('\n');
    
    lines.forEach(line => {
      line = line.trim();
      
      if (!line) return;
      
      // Handle ### headers
      if (line.startsWith('###')) {
        html += `<div class="campaign-header">${line.replace('###', '').trim()}</div>`;
        return;
      }
      
      // Handle bold text sections
      if (line.startsWith('**') && line.endsWith('**')) {
        html += `<div class="campaign-bold-section">${line.replace(/\*\*/g, '')}</div>`;
        return;
      }
      
      // Handle bullet points with bold parts
      if (line.startsWith('-')) {
        let formattedLine = line.substring(2) // Remove the "- "
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html += `<div class="campaign-bullet">${formattedLine}</div>`;
        return;
      }
      
      // Regular text
      html += `<div class="campaign-text">${line}</div>`;
    });
    
    // Add separator after each section except the last one
    if (index < sections.length - 1) {
      html += '<hr class="campaign-separator">';
    }
  });
  
  html += '</div>';
  return html;
}




function formatCampaignText(input) {
  // Clean the input by removing markdown code block markers
  let cleanInput = input
    .replace(/```json\n/, '')
    .replace(/```$/, '')
    .trim();
    
  try {
    const data = JSON.parse(cleanInput);
    let html = '<div class="campaign-container">';
    
    // Title and elevator pitch first
    html += `
      <div class="campaign-title">${data.campaign_name}</div>
      <div class="campaign-pitch">${data.elevator_pitch}</div>
    `;
    
    // Core Elements section
    html += '<div class="campaign-section">';
    html += '<div class="section-title">Core Elements</div>';
    
    // Process core_elements specially
    Object.entries(data.core_elements).forEach(([key, value]) => {
      html += `
        <div class="campaign-item">
          <span class="item-key">${key.replace(/_/g, ' ')}:</span>
          <span class="item-value">${value}</span>
        </div>
      `;
    });
    html += '</div>';
    
    // Process other main sections
    const sectionsToProcess = ['campaign_flow', 'world_details', 'dm_toolbox'];
    sectionsToProcess.forEach(section => {
      if (data[section]) {
        html += `
          <div class="campaign-section">
            <div class="section-title">${section.replace(/_/g, ' ')}</div>
        `;
        
        Object.entries(data[section]).forEach(([key, value]) => {
          if (typeof value === 'object' && !Array.isArray(value)) {
            html += `
              <div class="subsection">
                <div class="subsection-title">${key.replace(/_/g, ' ')}</div>
            `;
            Object.entries(value).forEach(([subKey, subValue]) => {
              html += `
                <div class="campaign-item">
                  <span class="item-key">${subKey.replace(/_/g, ' ')}:</span>
                  <span class="item-value">${Array.isArray(subValue) ? subValue.join(', ') : subValue}</span>
                </div>
              `;
            });
            html += '</div>';
          } else {
            html += `
              <div class="campaign-item">
                <span class="item-key">${key.replace(/_/g, ' ')}:</span>
                <span class="item-value">${Array.isArray(value) ? value.join(', ') : value}</span>
              </div>
            `;
          }
        });
        html += '</div>';
      }
    });
    
    html += '</div>';
    return html;
    
  } catch (error) {
    return `<div class="campaign-error">Error formatting campaign data: ${error.message}</div>`;
  }
}

module.exports = formatCampaignText