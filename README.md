# Node.js business management system 🤘

## Description
This Node.js system is a business management application that allows system administrators and users to manage various aspects of the business. It includes controllers, routers and models and uses MongoDB as the database. The system is integrated with Swagger for API documentation accessible at http://localhost:8001/api-docs.

## Properties
- User registration, login and logout functionality
- Scheduling meetings with the business owner
- View all the services offered by the business
- Manager functionality includes managing users and services, scheduling meetings and more

## validation
- Token-based authentication for administrators and regular users
- Access permissions for each function

## Component
- Mornings
- Routers
- Models
- Swager documentation
- Authentication system

## More details
- Environment variables managed using .env
- Unit tests were performed
- Code padding for code quality

## Prepare
1. Layer the reservoir
2. Install dependencies using `npm install`
3. Set the environment variables in the `.env` file
4. Run the app using `node app.js`

## Usage
- Register as a new user or log in as an existing user
- Explore the services offered and schedule appointments
- Administrators can manage users, services and meetings

## Technologies in use
- Node.js
- MongoDB
- Swager
- JWT for authentication
- Mocked and live for testing units
- ESLint for code padding
