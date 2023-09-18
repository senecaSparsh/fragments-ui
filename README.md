# fragments-ui

This repository contains the code and instructions for completing the Fragments Lab. The lab consists of two main components: fragments and fragments-ui. The fragments component is a microservice that provides data related to user fragments, and the fragments-ui component is a web application that allows users to interact with the microservice using Amazon Cognito for authentication.

# Table of Contents
Prerequisites
Getting Started
Setting Up the fragments Microservice
Setting Up the fragments-ui Web Application
Connect Web App to User Pool
Secure fragments Routes
Connect Client Web App to Secure Microservice


# Before you begin, make sure you have the following prerequisites installed:
Node.js (for both fragments and fragments-ui)
Git (for version control)
AWS Account with Amazon Cognito User Pool set up
GitHub Account (for hosting your code)
Getting Started
Setting Up the fragments Microservice


# Clone the fragments repository to your local machine:
git clone https://github.com/yourname/fragments.git


# Navigate to the fragments directory:
cd fragments


# Install the required dependencies:
npm install


# Create an .env file in the root of the fragments directory and add the following environment variables, replacing the placeholders with your own values:
PORT=8080
AWS_COGNITO_POOL_ID=us-east-1_xxxxxxxxx
AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx



# Start the fragments microservice:
npm run dev


Verify that the microservice is running by visiting http://localhost:8080 in your web browser or using a tool like curl.
Setting Up the fragments-ui Web Application


# Clone the fragments-ui repository to your local machine:
git clone https://github.com/yourname/fragments-ui.git



# Navigate to the fragments-ui directory:
cd fragments-ui


# Install the required dependencies:
npm install
Edit the package.json file to configure your web app with the appropriate details, such as name, description, and author.

# Create an .env file in the root of the fragments-ui directory and add the following environment variables, replacing the placeholders with your own values:
API_URL=http://localhost:8080
AWS_COGNITO_POOL_ID=us-east-1_xxxxxxxxx
AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_COGNITO_HOSTED_UI_DOMAIN=xxxxxxxx.auth.us-east-1.amazoncognito.com
OAUTH_SIGN_IN_REDIRECT_URL=http://localhost:1234
OAUTH_SIGN_OUT_REDIRECT_URL=http://localhost:1234
Create an src/auth.js file with the provided code to configure authentication with Amazon Cognito.

# Create an src/app.js file with the provided code to initialize your web app and handle authentication.

# Start the fragments-ui web application:
npm start
Open your web browser and visit the URL where the fragments-ui app is running (e.g., http://localhost:1234).

Connect Web App to User Pool
Sign in to your web app by clicking the "Login" button and following the Amazon Cognito Hosted UI flow.

Verify that you can successfully log in and log out from your web app.

Check the browser's Dev Tools Console to ensure that you see the expected authentication and user information.

Go to the AWS Console, navigate to the Cognito page, and access the Users and groups section to verify that your user has been created in your User Pool.

Secure fragments Routes
Modify the fragments microservice to use Passport.js for authentication and JWT verification.

Create routes and handlers to secure the fragments
