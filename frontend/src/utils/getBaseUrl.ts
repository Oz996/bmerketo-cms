export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side code
    return "http://localhost:7000"; // or return any default client URL
  } else if (process.env.NODE_ENV === "production") {
    // Running in production
    return "https://cms-api-ty0d.onrender.com"; // Update with your production API URL
  } else {
    // Running locally or in a development environment
    return "http://localhost:7000"; // Update with your local development API URL
  }
};
