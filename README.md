# user-management
View Users:It displays the users in a table format with columns for ID, First Name, Last Name, Email, and Department.
Add User:Clicking the "Add User" button reveals a form where you can input a new user's details and also When the form is submitted, a POST request is made to the /users endpoint with the new user data.
Edit User:Clicking the "Edit" button next to a user's details loads that user's information into the form for editing.
Delete User:Clicking the "Delete" button will send a DELETE request to remove the user from the API. Again this is a mock API,user not to be permanently deleted but will be removed from the frontend list.
