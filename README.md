# event-app

## Requirements

- docker
- docker-compose
- nodejs
- yarn
- npm

## How to run the application

1. cd server
2. touch .env.docker
3. insert into .env.docker file environmental variable DATABASE_URL (content -> "postgresql://root:postgres@host.docker.internal:5432/events?schema=public")
4. cd ..
5. docker-compose build
6. docker-compose up

## Tests pre-setup

1. npm i -g yarn
2. cd server
3. yarn
4. cd ..
5. cd website
6. yarn

## How to run tests

- frontend tests

  1. cd website
  2. yarn run test

- backend tests
  1. cd server
  2. yarn run test
