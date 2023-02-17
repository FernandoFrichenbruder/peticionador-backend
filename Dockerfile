# Use an official Node.js runtime as the base image
FROM node:16.15.1

WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the files to the working directory
COPY . .

# Expose port 3001 for the Express app to listen on
EXPOSE 3001

# Run the command to start the Express app
CMD [ "npm", "start" ]
