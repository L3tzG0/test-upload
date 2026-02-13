# Deployment

## Static hosting
This is a static SPA built with Vite.

### Build
```bash
npm run build
```

The output is in `dist/`.

### Preview locally
```bash
npm run preview
```

## Docker
### Production
```bash
docker compose up --build
```

This serves the built app using Nginx.

## CI/CD
- `ci.yml` runs lint and tests on pull requests
- `cd.yml` is a template for deployments (customize for your platform)
