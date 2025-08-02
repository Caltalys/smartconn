const plugin = require('tailwindcss/plugin');

// tailwind.config.js
module.exports = {
    content: [
        // Cập nhật đường dẫn để bao gồm thư mục `src`
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {

        },
    },
    plugins: [],
};
