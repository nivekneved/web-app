const { spawn } = require('child_process');
const path = require('path');

console.log('Running service photo fetcher script...\n');

// Path to the TypeScript file
const scriptPath = path.join(__dirname, 'fetchServicesAndPhotos.ts');

// Run the script using tsx
const child = spawn('tsx', [scriptPath], {
  stdio: 'inherit',
  env: { ...process.env, ...require('dotenv').config().parsed }
});

child.on('error', (error) => {
  console.error(`Error executing script: ${error.message}`);
});

child.on('close', (code) => {
  console.log(`Script exited with code ${code}`);
});
