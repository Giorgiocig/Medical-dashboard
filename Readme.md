Run eslint: npx eslint src

# Start-up mongoDB

- To create a container for mongoDB image (It will pull mongoDB image if not present in the local docker repository):
  docker run -d --name dbserver -p 27017:27017 --restart unless-stopped mongo:6.0.4

- Docker container should be start up to get db available

- To launch mongosh (MongoDB shell):
  mongosh mongodb://localhost:27017/reactmedicaldashboard

- To test
  reactmedicaldashboard> console.log("test")

# Test

mongo-db-memory-server allows to spin up a fresh instance of MongoDB database storing data only in memory, we can run our test on a fresh db

# express

To launch express
root dir -> npm run start

WITH NODEMON
to launch backend with nodemon
root dir -> npm run dev

# frontend

root project
cd frontend
npm run dev

# API routes

GET /api/v1/doctors?sortBy=name&sortOrder=ascending

GET /api/v1/doctors -> Get a list all doctors

GET /api/v1/doctors?name=mario -> get a list of doctors named "mario"

GET /api/v1/doctors/:id -> get a single doctor by id

POST /api/v1/doctors/:id Update an existing doctor by id

DELETE /api/v1/posts/:id Delete an existing doctor by id
