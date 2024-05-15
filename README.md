# Company Employee Form

This project was created for a part of my job interview.
It handles registering of companies, and hiring employees for existing companies.
## Components
The page consists of 3 main components:
- ### Form page
This page handles the data input with mandatory checks for validation.
- ### Company selection page
This page lets you select the company of the employees you want to see.
- ### Employee data page
Here you can see individual employees' data provided at hiring, eg. email address, and CV.

## API endpoints

Calling the API points is handled by the SubmitHandler function.
- `/api/employees`
employee data gets wrapped into a JSON format, and sent through on this endpoint together with the CV file for further processing at the backend.

- `/api/companies`
works similarly to the other endpoint, however it does not require a CV file.
