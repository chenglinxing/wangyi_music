const devBaseURL = "http://106.14.75.7:3000";
const proBaseURL = "http://106.14.75.7:3000";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
