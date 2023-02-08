# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

# Expose port 5000 for the Express app to listen on
EXPOSE 5000

# Run the command to start the Express app
CMD [ "npm", "start" ]
