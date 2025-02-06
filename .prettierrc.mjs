/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      // For Astro files
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      // For TypeScript files (.ts and .tsx)
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
    {
      // For HTML files
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
    {
      // For CSS files
      files: '*.css',
      options: {
        parser: 'css',
      },
    },
    {
      // For SCSS/SASS files
      files: '*.scss',
      options: {
        parser: 'scss',
      },
    },
    {
      // For Markdown files
      files: '*.md',
      options: {
        parser: 'markdown',
      },
    },
  ],
  // Global Prettier settings
  singleQuote: true, // Use single quotes instead of double quotes
  semi: true, // End statements with semicolons
  tabWidth: 2, // Set the number of spaces per indentation level
  trailingComma: 'es5', // Add trailing commas where valid in ES5 (e.g., in arrays and objects)
};
