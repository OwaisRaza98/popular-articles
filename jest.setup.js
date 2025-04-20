// jest.setup.js
import '@testing-library/jest-dom';

// Mock SVG files
jest.mock('../assets/react.svg', () => 'test-svg-stub');

// Set environment variables
process.env.VITE_NYTIMES_API_KEY = 'test-api-key';

// Polyfills
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;