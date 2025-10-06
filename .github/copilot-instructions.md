# Project description

This is a personal website. It includes travel photos, blog posts, and a code portfolio. It is built using Next.js, TypeScript, and Tailwind.

The blog is somewhat a separate system based on markdown files.

# General

- Use pnpm for package management.
- Never ask: "Would you like me to make this change for you?". Just do it.
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants
- When a React component is wrapped in `memo()` or similar, the inner function should have the same name but with an underscore (\_) appended.
- Prefer try/catch blocks for async operations
- When available, always use a file path that begins with an `@` path from tsconfig.json.

## Styling

- Prefer CSS Modules.
- If the selector applies the same value to both `padding-left` and `padding-right`, use `padding-inline`. The same goes for margin, and for `-block` in place of `-top` & `-bottom`. But this rule only applies if they're both defined with the same value (that is, don't use `margin-block-start`, etc).
- Use CSS variables already defined in the repo. Fall back to those defined by a third-party library that's already in use.
- Make use of CSS nesting.
- When the CSS file is imported by the JSX file, import it as `css` (instead of `styles`, etc).
