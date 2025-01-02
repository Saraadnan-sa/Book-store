**1. Install Dependencies**
Open a terminal and navigate to the project's root directory. Install the required dependencies for both the backend and frontend:

Navigate to the backend directory

`cd backend`

`npm install`

Repeat this for the frontend directory if there is one (usually inside the src or client folder).

Navigate to the frontend directory

`cd ../src`

`npm install`

**2. Setup the Environment Variables**
Check if there's an .env file in the backend folder. If it exists, ensure it has the correct configuration (like the MongoDB URI). If it doesn't exist, create one and add necessary environment variables. Example:

PORT=5000
MONGO_URI=mongodb://localhost:27017/your_database_name
Replace your_database_name with the name of your MongoDB database.

**3. Start MongoDB**
Ensure MongoDB is running locally or in the cloud. If running locally, start the MongoDB service:

Start MongoDB service

`mongod`

**4. Run the Backend**
After setting up the environment, start the backend server. Run this command inside the backend directory:

`npm start`

If the start script is not configured in the package.json, use:

`node index.js`

**5. Run the Frontend**
Navigate to the frontend directory (e.g., src) and start the React app:

`npm start`

**6. Access the Application**
Backend API: Check if the backend is working by visiting http://localhost:5000 (or the port you configured) in your browser or using tools like Postman.
Frontend: Access the application in your browser at http://localhost:3000 (default React port).
