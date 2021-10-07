FROM node:latest
ADD . /home/server
WORKDIR /home/server
RUN yarn --ignore-engines
RUN yarn run build
EXPOSE 5001
CMD ["yarn","run","start"]