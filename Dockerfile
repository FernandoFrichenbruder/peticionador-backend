# Use an official Node.js runtime as the base image
FROM node:16.15.1

WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY app/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY app/ .

# Expose port 3001 for the Express app to listen on
EXPOSE 3001

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

# Set the entrypoint script as executable
RUN chmod +x /app/entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]


# Run the command to start the Express app
CMD [ "npm", "start" ]
