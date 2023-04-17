#!/bin/sh

# Run sequelize migrations
npx sequelize db:migrate --migrations-path ./database/migrations

# Start the application
npm start
