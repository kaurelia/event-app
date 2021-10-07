FROM node:latest
ADD . /home/website
WORKDIR /home/website
RUN yarn --ignore-engines
RUN yarn run build
EXPOSE 5000
CMD ["yarn","run","start"]