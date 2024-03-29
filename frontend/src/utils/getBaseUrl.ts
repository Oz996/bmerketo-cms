export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // fetch from our local backend if browsing locally, or fetch from hosted service if not
    if (window.location.host.includes("localhost")) {
      return "http://localhost:7000";
    }
    return "https://cms-api-ty0d.onrender.com";
  }
};
