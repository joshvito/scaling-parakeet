FROM node:22
WORKDIR /proxy
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 80
ENV PORT=80
ENV DOWNSTREAM_SERVER_LOCATION="http://swapi.py4e.com/api"
ENV MAX_ATTEMPTS=10
ENV WINDOW_MS=60000
CMD ["npm", "start"]