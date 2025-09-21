// config.js - Configuration management
class Config {
    constructor() {
        // Try to load from environment variables first
        this.apiKey = this.getApiKey();
        this.isDevelopment = this.getEnvironment() === 'development';
        this.isProduction = this.getEnvironment() === 'production';
    }

    getApiKey() {
        // Priority order: environment variable > prompt user > throw error
        if (typeof process !== 'undefined' && process.env && process.env.GOOGLE_AI_API_KEY) {
            return process.env.GOOGLE_AI_API_KEY;
        }
        
        // For client-side applications, you might need to prompt or use a different method
        const storedKey = localStorage.getItem('fashionaire_api_key');
        if (storedKey) {
            return storedKey;
        }

        // If no API key found, provide instructions
        console.warn('⚠️ No API key found. Please set your GOOGLE_AI_API_KEY environment variable.');
        return null;
    }

    getEnvironment() {
        if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
            return process.env.NODE_ENV;
        }
        return 'production'; // Default to production for safety
    }

    // Method to set API key at runtime (for client-side apps)
    setApiKey(key) {
        this.apiKey = key;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('fashionaire_api_key', key);
        }
    }

    // Method to validate API key format
    isValidApiKey(key = this.apiKey) {
        return key && typeof key === 'string' && key.length > 10;
    }
}

// Create and export config instance
const config = new Config();

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

// For browser environments
if (typeof window !== 'undefined') {
    window.FashionAireConfig = config;
}