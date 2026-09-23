# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Chatbot configuration

The chatbot sends requests to the server-side `/api/chat` endpoint. Set `GEMINI_API_KEY` as a server environment variable, or place it in a local `.env` file based on `.env.example`. Do not rename it to `VITE_GEMINI_API_KEY`: Vite exposes variables with the `VITE_` prefix to the browser.

For a Vercel deployment, add `GEMINI_API_KEY` in the project's Environment Variables and redeploy. The local Vite server includes the same API handler during `npm run dev`.
