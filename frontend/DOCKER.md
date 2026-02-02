# Frontend Docker Instructions

## Build the Docker Image

cd frontend
docker build --build-arg VITE_API_URL=http://your-api.com/api/todos -t todo-frontend .

## Run the Container

docker run -p 3000:80 todo-frontend

## Production Deployment

For production, you'll want to:
1. Use environment variables for API URL
2. Set up proper CORS on backend
3. Use docker-compose to run both frontend and backend together

## Image Details

- **Base Image**: nginx:alpine (lightweight)
- **Build Type**: Multi-stage (smaller final image)
- **Port**: 80 (mapped to your choice on host)
- **Features**: Gzip compression, caching, SPA routing, security headers
