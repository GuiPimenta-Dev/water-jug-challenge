FROM node:17.4.0-slim
RUN apt-get update \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]