// tailwind.config.js
const withOpacityValue = (variable) => {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`;
};

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue("--primary"),
        secondary: withOpacityValue("--secondary"),
        accent: withOpacityValue("--accent"),
        success: withOpacityValue("--success"),
        warning: withOpacityValue("--warning"),
        danger: withOpacityValue("--danger"),
        info: withOpacityValue("--info"),
        muted: withOpacityValue("--muted"),
        background: withOpacityValue("--background"),
        foreground: withOpacityValue("--foreground"),
      },
    },
  },
  plugins: [],
};
