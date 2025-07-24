#!/usr/bin/env node

/**
 * WebSocket Fix Script for Vite Development Server
 * 
 * This script helps resolve WebSocket connection issues in development
 * by providing multiple configuration options.
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(process.cwd(), 'vite.config.js');
const FALLBACK_CONFIG_PATH = path.join(process.cwd(), 'vite.config.fallback.js');

console.log('🔧 WebSocket Fix Script for Vite');
console.log('================================\n');

// Check if files exist
if (!fs.existsSync(CONFIG_PATH)) {
  console.error('❌ vite.config.js not found!');
  process.exit(1);
}

if (!fs.existsSync(FALLBACK_CONFIG_PATH)) {
  console.error('❌ vite.config.fallback.js not found!');
  process.exit(1);
}

const command = process.argv[2];

switch (command) {
  case 'disable-hmr':
    // Use fallback config with HMR disabled
    fs.copyFileSync(FALLBACK_CONFIG_PATH, CONFIG_PATH);
    console.log('✅ Switched to fallback configuration (HMR disabled)');
    console.log('📝 This will eliminate WebSocket errors but require manual refresh');
    console.log('🚀 Restart your dev server: npm run dev');
    break;

  case 'status':
    // Check current configuration
    const config = fs.readFileSync(CONFIG_PATH, 'utf8');
    const hasHMR = config.includes('hmr:') && !config.includes('hmr: false');
    
    console.log('📊 Current Configuration Status:');
    console.log(`   HMR Enabled: ${hasHMR ? '✅ Yes' : '❌ No'}`);
    console.log(`   WebSocket: ${hasHMR ? '🔄 Active (may have issues)' : '🚫 Disabled'}`);
    
    if (hasHMR) {
      console.log('\n💡 If you\'re experiencing WebSocket errors, run:');
      console.log('   node scripts/fix-websocket.js disable-hmr');
    }
    break;

  case 'help':
  default:
    console.log('📖 Available Commands:');
    console.log('');
    console.log('  disable-hmr  - Switch to configuration without HMR (fixes WebSocket)');
    console.log('  status       - Check current configuration status');
    console.log('  help         - Show this help message');
    console.log('');
    console.log('🔍 WebSocket Issues Troubleshooting:');
    console.log('');
    console.log('1. Try restarting your development server:');
    console.log('   npm run dev');
    console.log('');
    console.log('2. Clear browser cache:');
    console.log('   Ctrl+Shift+R (hard refresh)');
    console.log('');
    console.log('3. If issues persist, disable HMR:');
    console.log('   node scripts/fix-websocket.js disable-hmr');
    console.log('');
    console.log('📝 Note: WebSocket errors only affect development.');
    console.log('   Your production site will work perfectly!');
    break;
}
