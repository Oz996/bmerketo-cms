export const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  export const scrollToTopSmooth = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };