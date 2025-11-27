const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function convertSvgToPng() {
  // SVG 192
  const svg192 = fs.readFileSync('./public/icon-192.svg', 'utf8');
  const canvas192 = createCanvas(192, 192);
  const ctx192 = canvas192.getContext('2d');
  
  // Background
  ctx192.fillStyle = '#0B0B0D';
  ctx192.fillRect(0, 0, 192, 192);
  
  // Circle
  ctx192.strokeStyle = 'rgba(139, 0, 0, 0.3)';
  ctx192.lineWidth = 3;
  ctx192.beginPath();
  ctx192.arc(96, 96, 80, 0, Math.PI * 2);
  ctx192.stroke();
  
  // Text KJ
  ctx192.fillStyle = '#8B0000';
  ctx192.font = 'bold 60px serif';
  ctx192.textAlign = 'center';
  ctx192.textBaseline = 'middle';
  ctx192.shadowColor = 'rgba(139, 0, 0, 0.8)';
  ctx192.shadowBlur = 10;
  ctx192.fillText('KJ', 96, 96);
  
  const buffer192 = canvas192.toBuffer('image/png');
  fs.writeFileSync('./public/icon-192.png', buffer192);
  
  // SVG 512
  const canvas512 = createCanvas(512, 512);
  const ctx512 = canvas512.getContext('2d');
  
  // Background
  ctx512.fillStyle = '#0B0B0D';
  ctx512.fillRect(0, 0, 512, 512);
  
  // Circle
  ctx512.strokeStyle = 'rgba(139, 0, 0, 0.2)';
  ctx512.lineWidth = 4;
  ctx512.beginPath();
  ctx512.arc(256, 256, 200, 0, Math.PI * 2);
  ctx512.stroke();
  
  // Text KJ
  ctx512.fillStyle = '#8B0000';
  ctx512.font = 'bold 160px serif';
  ctx512.textAlign = 'center';
  ctx512.textBaseline = 'middle';
  ctx512.shadowColor = 'rgba(139, 0, 0, 0.8)';
  ctx512.shadowBlur = 20;
  ctx512.fillText('KJ', 256, 256);
  
  // Subtitle
  ctx512.shadowBlur = 0;
  ctx512.fillStyle = '#666';
  ctx512.font = '32px sans-serif';
  ctx512.fillText('KARANG JIWO', 256, 380);
  
  const buffer512 = canvas512.toBuffer('image/png');
  fs.writeFileSync('./public/icon-512.png', buffer512);
  
  console.log('Icons created successfully!');
}

convertSvgToPng();
