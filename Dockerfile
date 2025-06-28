FROM node:22 AS proxy
WORKDIR /proxy

COPY package*.json ./
RUN npm ci

COPY . .

ENV PORT=80
ENV DOWNSTREAM_SERVER_LOCATION="http://swapi.py4e.com/api"
ENV MAX_ATTEMPTS=10
ENV WINDOW_MS=60000

EXPOSE 80
CMD ["npm", "start"]
FROM postman/newman:alpine AS tests

COPY security-proxy-test.postman_collection.json /tests/collection.json

# Optional: if using a Postman environment file, copy it too
# COPY security-proxy-env.postman_environment.json /tests/environment.json

CMD ["run", "/tests/collection.json", "--insecure", "--delay-request", "30", "--timeout", "10000"]
