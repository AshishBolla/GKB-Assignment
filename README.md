# User Management Web Application

This is a basic web application that allows users to input data, validate it, store it in a database, retrieve it, and display it in a table format.


## Technologies Used
####  • Backend:
Node.js with Express framework

#### • Frontend:
 HTML, CSS, JavaScript

#### • Database:
SQLite3


## Project Structure
**• server.js:** Backend server code handling HTTP requests and database operations.
**• public/:** Static files including HTML, CSS, and JavaScript for the frontend.
**• database.db:** SQLite database file storing user data.


## Functionalities
#### 1. UserInputForm:

• Allows users to input their name, email, age, and date of birth.
• Includes client-side validation for email format and age as a positive integer.

#### 2. Database Storage:
• Stores user data (name, email, age, dob) in the SQLite database.

#### 3. Data Retrieval:
• Retrieves user data from the database and displays it in a tabular format on the frontend.

#### 3. Delete User:
• Allows deleting a user by clicking on the delete icon, removing the data from both the interface and the database.


## Setup and Usage

#### 1. Clone the repository:

*git clone https://github.com/your-username/user-management-app.git*

#### 2. Install dependencies:

*cd user-management-app*
*npm install*

#### 3. Start the server:

*npm start*

#### 4.Open your browser and go to *http://localhost:3000* to access the application.

## Database Schema

The database schema includes a single table named users with the following columns:

**• id**: Integer (Primary Key, Auto Increment)
**• name**: Text
**• email**: Text
**• age**: Integer
**• dob**: Date

## Styles
The application uses CSS for styling, including responsive design for a user-friendly interface. The styles are defined in the *styles.css* file located in the *public/* directory.

#### Contributor
Ashish Bolla 
+918688774165
bollaashish8@gmail.com
