# Flashcards

Made as a side project to learn React, React Hooks, Firebase, Mongodb, UX, Etc.

### Author:

Brian Keefe

### Collaborators:

David Keefe

### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installation Guide

## Requirements

-   Install Mongodb
    -   Follow this [link](https://www.mongodb.com/download-center/community?jmp=docs)
    -   Select mongodb community, and follow the instructions to install

-   Install NodeJs
    -   Follow this [link](https://nodejs.org/en/download/)
    -   Follow the instructions to install

-   NPM
    - This should be installed with node
    - To confirm, open up the console and type `node -v` and `npm -v`. Make sure it doesn't give an error
    
-   Install Yarn
    -   Follow this [link](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
    -   Follow the instructions to install
-   **Restart your computer**

-   Run Mongodb
    -   Instructions [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition)

-   Start the program
    -   See instructions below...

## Starting the Server

1. Open the console at the root of the project and type `yarn` or `yarn install`


2. Next,run `yarn go` - This will launch the website at location `localhost:3000`

2. Open a **separate command prompt** and run `yarn dev`
        - This will run the database
        - No further configuration needed 

3. Navigate to the [home page at localhost:3000](http://localhost:3000)

#### Summary:
`yarn go`

`yarn dev`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
