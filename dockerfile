# Use official Node.js 18 image as the base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the port your app uses (change if using a different port)
EXPOSE 3000

# Default command to run the server
CMD ["node", "server.js"]
