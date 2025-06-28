FROM node:22
WORKDIR /proxy
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=80
ENV DOWNSTREAM_SERVER_LOCATION="http://swapi.py4e.com/api"
ENV MAX_ATTEMPTS=20
ENV WINDOW_MS=60000
EXPOSE 80
CMD ["npm", "start"]