# Setup Guide

## 1) Install tooling
- Install Node.js 20+ (recommended via nvm)
- Use npm 9+

Verify:
```bash
node -v
npm -v
```

## 2) Install dependencies
From the repository root:
```bash
npm install
```

## 3) Environment variables
This project does not require secrets by default.
- Copy `.env.example` to `.env` if you want to customize Vite settings.

```bash
cp .env.example .env
```

## 4) Run the app
```bash
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## 5) Run tests
```bash
npm test
```

## 6) Lint and format
```bash
npm run lint
npm run format
```

## 7) Docker (optional)
### Development
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production
```bash
docker compose up --build
```

## Troubleshooting
- If tests fail due to environment issues, ensure Node 20+.
- If the dev server fails to start, delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
