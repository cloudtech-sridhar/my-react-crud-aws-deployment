# backend/Dockerfile
FROM node:14

# Set environment variables for database connection
ENV DB_HOST=my-database-postgresql.cnilbmzcb4cc.us-east-1.rds.amazonaws.com
ENV DB_PORT=5432
ENV DB_NAME=postgres_employee
ENV DB_USER=postgres_react
ENV DB_PASSWORD=postgres_password

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
