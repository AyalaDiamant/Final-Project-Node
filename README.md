Project Name: Small Business Management Server
Project Description
This project is a server-side application designed to manage a small business for a professional service provider. The application allows the business owner to manage different services they offer and allows clients to book appointments. Each appointment must be associated with one of the services provided.

Features
Business Management:

Create and update business details.
Service Management:

Create, update, and delete services offered by the business.
Appointment Management:

Create, update, and delete appointments.
Ensure no overlapping appointments are scheduled.
User Management:

Create users (admin only).
Controllers
Business Controller (business)
Create Business:
Endpoint: /business/create
Method: POST
Description: Create a new business. Only accessible by admin.
Update Business:
Endpoint: /business/update/:id
Method: PUT
Description: Update business details. Only accessible by admin.
Services Controller (services)
Create Service:
Endpoint: /services/create
Method: POST
Description: Create a new service. Only accessible by admin.
Update Service:
Endpoint: /services/update/:id
Method: PUT
Description: Update service details. Only accessible by admin.
Delete Service:
Endpoint: /services/delete/:id
Method: DELETE
Description: Delete a service. Only accessible by admin.
Meeting Controller (meeting)
Create Meeting:
Endpoint: /meeting/create
Method: POST
Description: Create a new meeting. Accessible by all users.
Note: Ensure no overlapping meetings.
Update Meeting:
Endpoint: /meeting/update/:id
Method: PUT
Description: Update meeting details. Only accessible by admin.
Delete Meeting:
Endpoint: /meeting/delete/:id
Method: DELETE
Description: Delete a meeting. Only accessible by admin.
Users Controller (users)
Create User:
Endpoint: /users/create
Method: POST
Description: Create a new user. Only accessible by admin.
Middleware
Authentication Middleware:
Description: Protects routes that should only be accessible by authenticated users.
Apply to: Business creation, service creation/update/deletion, meeting update/deletion.
Database
Tables
Business Table: Stores business details.
Services Table: Stores services offered by the business.
Meetings Table: Stores meeting details.
Users Table: Stores user details.
Installation
Clone the repository:
bash
Copy code
git clone <repository_url>
Install dependencies:
bash
Copy code
npm install
Set up the database and configure environment variables.
Running the Project
Start the server:
bash
Copy code
npm start
Usage
Use the provided endpoints to manage business, services, meetings, and users.
Ensure to use the appropriate authentication for admin-restricted actions.
Notes
Clients are identified via email or phone for simplicity.
Implementing a proper client entity can be a challenge for those interested.
Overlapping meetings will return a 400 error.
Reference
For more details and inspiration, you can refer to the nodeBaseProject (note: use with caution due to potential issues).
