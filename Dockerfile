FROM node:22
WORKDIR /proxy
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 80
ENV PORT=80
CMD ["npm", "start"]