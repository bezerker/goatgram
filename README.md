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
- Stories rail with fullscreen viewer
- Light/dark mode toggle
- Fake baby goat and barn-animal content
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
  --set image.tag=latest
```

## Cloudflared ingress snippet

Add this to official `cloudflared` Helm values:

```yaml
ingress:
  - hostname: goatgram.net
    service: http://goatgram.goatgram.svc.cluster.local:3000
  - hostname: www.goatgram.net
    service: http://goatgram.goatgram.svc.cluster.local:3000
  - service: http_status:404
```

## CI

Push to `main` builds and pushes:

- `ghcr.io/bezerker/goatgram:latest`

Workflow file: `.github/workflows/docker-build.yml`
