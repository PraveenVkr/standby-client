// src/config.js

const getEnvVar = (key, defaultValue = undefined) => {
  return import.meta.env[key] ?? defaultValue;
};

// Specific helper for VITE_API_URL
export const apiUrl = getEnvVar("VITE_BASE_URL");
export const wsUrl = getEnvVar("VITE_WS_URL");

// You can export other environment variables here as needed
export default getEnvVar;
