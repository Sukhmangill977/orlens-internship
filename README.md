# oralens-internship
 
# Organization and Team Management Web Application

A web application to manage organizations, teams, and individuals, allowing users to register organizations, create teams, assign members to teams, and upload profile images for members. The application provides a hierarchical view of organizations, teams, and members, along with status markers for image uploads. It also offers an API for fetching organization data.

## Features

1. **Organization and Team Management:**
   - Register organizations with basic details (name, email, location).
   - Add teams under organizations.
   - Add individual members under teams with unique IDs.
   - Display a hierarchical list of organizations, teams, and individual members.

2. **File Upload:**
   - Upload images for individual profiles (via file upload or camera).
   - Associate uploaded images with individual profiles.
   - Display image upload status: "Image Not Uploaded" (red) or "Image Uploaded" (green).

3. **Status Display:**
   - Dynamic status markers indicating the image upload status for each member in the list view.

4. **API Endpoints:**
   - Fetch all organization records in JSON format.
   - Add, update, and delete organizations through the REST API.

5. **Optional Bonus:**
   - Deployed on Render for free hosting.

---

## Project Structure

### Backend (Node.js/Express)
- **API Endpoints:**
  - `GET /api/organizations`: Fetch all organizations.
  - `POST /api/organizations`: Add a new organization.
  - `GET /api/organizations/:id`: Fetch a specific organization by ID.
  - `GET /api/organizations/:orgId/teams`: Fetch all teams under an organization.
  - `GET /api/organizations/:orgId/teams/:teamId`: Fetch a specific team under an organization.
  - `GET /api/organizations/:orgId/teams/:teamId/members`: Fetch members of a specific team.
  - `DELETE /api/organizations/:id`: Delete an organization.

### Frontend (React)
- **HomePage**: Welcome page with an option to navigate to the dashboard.
- **Organization**: Component to manage organizations, teams, and members.
- **OrganizationList**: Displays a list of organizations and allows adding and deleting organizations.
- **TeamList**: Displays teams within an organization and allows team management.
- **FileUpload**: Component for uploading profile images for members.

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
2. Install dependencies
Backend
Install required packages for the backend:
bash

cd server
npm install
Frontend
Install required packages for the frontend:
bash

cd client
npm install
3. Start the application
Backend
Run the server:
bash

cd server
npm start
The backend server will be running on http://localhost:5001.

Frontend
Run the React app:
bash

cd client
npm start
The frontend will be running on http://localhost:3000.

Usage
Create an Organization:
Click on "Add Organization" to enter the organization's details (name, email, location).
Manage Teams and Members:
Once an organization is added, you can create teams and add members to those teams.
Image Upload:
Upload profile images for members and view their status as "Image Uploaded" (green) or "Image Not Uploaded" (red).
View Organizations:
All organizations, teams, and members are displayed in a hierarchical structure.
API Documentation
Get All Organizations
http

GET /api/organizations
Returns a list of all organizations, including their teams and members.

Add an Organization
http

POST /api/organizations
Body:

json

{
  "name": "Organization Name",
  "email": "organization@example.com",
  "location": "Location"
}
Returns the newly created organization.

Delete an Organization
http

DELETE /api/organizations/:id
Deletes an organization by its ID.

Deployment
The application is deployed on Render and can be accessed via the following link:

Live Link

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Express
React
Render for free hosting.
vbnet


### Notes:
- Replace `<repository-url>` and `<your-render-deployment-url>` with your actual repository and deployment URLs.
- If the file structure is different or additional information needs to be included,
