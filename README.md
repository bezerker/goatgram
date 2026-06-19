# Goatgram

Parody Instagram clone for baby goat reels, fake farm-animal stories, dark mode, and one deeply unserious upload button.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- `next-themes` for dark mode
- Helm chart for Kubernetes deploy
- GHCR image publish via GitHub Actions

## Local dev

```bash
npm install
npm run dev
```

App runs on `http://localhost:3000`.

## Features

- Vertical reels-style feed
- Stories rail with fullscreen viewer synced to clip duration
- Light/dark mode toggle
- Real free-use goat and farm-animal clips
- Upload button opens `BAAAAA`
- Profile page at `/profile/goatgram`

## Build

```bash
npm run build
```

## Docker

```bash
docker build -t ghcr.io/bezerker/goatgram:latest .
docker run --rm -p 3000:3000 ghcr.io/bezerker/goatgram:latest
```

## Helm deploy

```bash
helm upgrade --install goatgram ./chart/goatgram \
  --namespace goatgram \
  --create-namespace \
  --set image.repository=ghcr.io/bezerker/goatgram \
  --set image.tag=adfe7ad
```


## Cloudflared ingress snippet

The chart ships a templated Ingress resource (cloudflare-tunnel by default).
Set `ingress.hosts` in values.yaml; DNS CNAMEs must still point to your tunnel.

## CI

Push to `main` builds and pushes:

- `ghcr.io/bezerker/goatgram:latest`

Workflow file: `.github/workflows/docker-build.yml`
