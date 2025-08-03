# Image Gallery

## Setup and Run

### Local Development
```bash
npm install
npm run dev
```
Open http://localhost:5173/

### Docker
```bash
docker build -t image-gallery .
docker run -it -p 8080:8080 --rm --name image-gallery-1 image-gallery
```
Open http://127.0.0.1:8080/