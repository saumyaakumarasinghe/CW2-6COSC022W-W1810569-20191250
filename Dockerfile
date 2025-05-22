# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN npm install --prefix client
RUN npm install --prefix server

# Copy project files
COPY . .

# Build the client
RUN npm run build --prefix client

# Expose ports
EXPOSE 8000
EXPOSE 3000

# Start both services
CMD ["npm", "run", "start"]