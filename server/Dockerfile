FROM node:latest
ADD . /home/server
ADD ./.env.docker /home/server/.env
WORKDIR /home/server
RUN yarn --ignore-engines
RUN yarn run generate-schema
RUN yarn run build
RUN chmod +x ./start.sh
EXPOSE 5001
CMD ["./start.sh"]