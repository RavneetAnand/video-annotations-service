FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 8000
RUN chown -R node /usr/src/app
RUN npm run build
USER node
CMD ["npm", "start"]
