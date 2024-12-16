# Stage 1: Install dependencies
FROM node:18-alpine AS dependencies

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Stage 2: Copy application code
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only production dependencies from the previous stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the application code
COPY . .

# Expose application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
