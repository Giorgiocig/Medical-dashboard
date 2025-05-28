Run eslint: npx eslint src

# Start-up mongoDB

- To create a container for mongoDB image (It will pull mongoDB image if not present in the local docker repository):
  docker run -d --name dbserver -p 27017:27017 --restart unless-stopped mongo:6.0.4

  This command will run mongodb container every time computer is started up. It needs to be removed manually via docker command.

- Docker container should be start up to get db available

- To launch mongosh (MongoDB shell):
  mongosh mongodb://localhost:27017/reactmedicaldashboard

- To test
  reactmedicaldashboard> console.log("test")

# Test

mongo-db-memory-server allows to spin up a fresh instance of MongoDB database storing data only in memory, we can run our test on a fresh db

# env files

1. in backend folder create a new .env file and write

PORT = 3000
DATABASE_URL=mongodb://localhost:27017/reactmedicaldashboard

2. in root folder --> frontend create another .env file and write

VITE_BACKEND_URL="http://localhost:3000/api/v1"

IMPORTANT
dotenv package needs to be installed

# START UP WITHOUT DOCKER

## express - backendd

To launch express
root dir -> npm run start

WITH NODEMON
to launch backend with nodemon
root dir -> npm run dev

## frontend - frontend

root project
cd frontend
npm run dev

# DOCKER BUILD AND RUN BACKEND AND FRONTEND IMAGES

## build backend image

docker image build -t reactmedicaldashboard-backend backend/

## run backend image

docker run --network=host -e PORT=3000 -e DATABASE_URL=mongodb://172.17.0.1:27017/reactmedicaldashboard -p 3000:3000 reactmedicaldashboard-backend

## build frontend image

docker build -t reactmedicaldashboard-frontend --build-arg VITE_BACKEND_URL=http://localhost:3000/api/v1 .

## run frontend image

docker run -p 3001:80 reactmedicaldashboard-frontend

app is available to localhost:3001

## docker-compose

to build the application in the root project --> docker compose up

# API routes

GET /api/v1/doctors?sortBy=name&sortOrder=ascending

GET /api/v1/doctors -> Get a list all doctors

GET /api/v1/doctors?name=mario -> get a list of doctors named "mario"

GET /api/v1/doctors/:id -> get a single doctor by id

POST /api/v1/doctors/:id Update an existing doctor by id

DELETE /api/v1/posts/:id Delete an existing doctor by id
