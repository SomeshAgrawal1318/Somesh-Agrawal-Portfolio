const config = {
  title: "Somesh Agrawal | AI & Full-Stack Engineer",
  description: {
    long: "Explore the portfolio of Somesh Agrawal, an AI & full-stack engineer and ML enthusiast building intelligent, interactive web experiences. Discover my latest work spanning machine learning, full-stack apps, and creative engineering. Let's build something amazing together!",
    short:
      "Discover the portfolio of Somesh Agrawal, an AI & full-stack engineer building intelligent web experiences and ML-powered projects.",
  },
  keywords: [
    "Somesh Agrawal",
    "portfolio",
    "AI engineer",
    "full-stack engineer",
    "machine learning",
    "ML enthusiast",
    "web development",
    "interactive websites",
    "GSAP",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
  ],
  author: "Somesh Agrawal",
  email: "someshagrawal1805@gmail.com",
  site: "https://someshagrawal.com",

  // for github stars button
  githubUsername: "SomeshAgrawal1318",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://www.linkedin.com/in/someshag/",
    github: "https://github.com/SomeshAgrawal1318",
    
  },
};
export { config };
