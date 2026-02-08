# Coding standards and practices

Don't ask for permission before continuing. Just do it. Keep going until you solve the problem.

## Project overview

This is an Astro-based personal website with blog and photo galleries, deployed on Netlify. Key technologies:

- **Astro 5** with React integration for interactive components
- **Tailwind CSS** + CSS Modules for styling
- **Astro Content Collections** for blog posts (stored in `src/posts/`)
- **Cloudinary** for photo gallery image hosting
- **pnpm** as package manager

### Key commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm lint` — Run ESLint, TypeScript check, and unused Sass variable finder

### Path aliases

Use `@src/` for imports from the `src/` directory (configured in `astro.config.mjs` and `tsconfig.json`).

## Frontend conventions

- Functions and components should not require more information (arguments) than they need.
- If a function takes more than 2 arguments, consider refactoring it to take an object with named properties instead.

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants
- When a React component is wrapped in `memo()` or similar, the inner function should have the same name but with an underscore (\_) appended.

## Error Handling

- Prefer try/catch blocks for async operations

## Styling

- Prefer CSS Modules over other solutions
- If the selector applies the same value to both `padding-left` and `padding-right`, use `padding-inline`. The same goes for margin, and for `-block` in place of `-top` & `-bottom`. But this rule only applies if they're both defined with the same value (that is, don't use `margin-block-start`, etc).

### CSS Modules

- Make use of CSS variables.
- Make use of native CSS nesting.
- When a CSS module file is imported by a TSX file, import it as `css`.

## Tests

- Tests should be written in the same directory as the component being tested, in a file with the same name but with `.test.tsx` or `.test.ts` extension.

## React

- Use functional components with hooks instead of class components.
- Prefer composition and using `children` over props for passing content.
- Prefer `useReducer` or Zustand over multiple `useState`.
- Try to keep the number of hooks to a minimum.
- If an object is used as a prop but the recipient component only needs up to 3 properties that all have primitive values, only pass the needed properties instead of the whole object.

## Miscellaneous preferences

- Avoid using `as` in TypeScript when possible. If it's necessary, add a comment explaining why.
- Use `@ts-expect-error` instead of `@ts-ignore` and explain why it's needed. Only use this when absolutely necessary.
- When available, always use import paths that begins with an `@` path from tsconfig.json.
- Always use explicit return types for TypeScript functions
- Add detailed JSDoc comments for complex exported functions
- Include accessibility attributes when adding new UI components
- Use semantic HTML elements when possible
- Use descriptive variable names even if they're longer
- Prefer composition over inheritance in component design

## Tests

- Follow the "arrange, act, assert" pattern. Separate each step with a blank line.
- Use clear naming to make the test self-documenting.
- Write a separate test case for each code branch for the sake of cyclomatic complexity.
- Tests should cover edge, corner, and boundary cases.
