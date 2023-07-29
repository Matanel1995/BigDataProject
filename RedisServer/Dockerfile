# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port on which your Node.js application listens
EXPOSE 9000

# Start the Node.js application
CMD ["node", "redis.js"]