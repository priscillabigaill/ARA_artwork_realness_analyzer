# Use official Node.js image as base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that React app will run on
EXPOSE 5173

# Run the React app (we add --host to make it work in containers)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
