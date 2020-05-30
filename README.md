# Bookstore APP ## v.1.0.5
==========================
![Bookstore CI/CD](https://github.com/Virtuallified/Bookstore/workflows/Bookstore%20CI/CD/badge.svg?branch=master)

This project is about book keeping and managing it in a well manner.
<br>Language : Node.js
<br>Framework : Sail.js
<br>Testing Kit : Jest, Supertest
<br>Database : MongoDB
<br>IDE : VS Code
<br>Template Engine : EJS
<br>Tools : Passport.js, Bcrypt, Bootstrap 4, 

In the project directory, first you have to run -
-------------------------------------------------
### 1. First install all the dependencies
```
npm install
```

### 2. To run the app
```
sails lift   ||   node app.js
```

### 3. To test unit cases
```
npm test
```

### 4. For development purpose
```
nodemon app.js
```

### 5. For production mode
After changing the specific environment variable for production
```
npm start
```

### 6. Runs the app in the development mode
Open URL : To view the site in the browser.
[http://localhost:1337/](http://localhost:1337/)

### 7. For demo purpose view the app is in production mode
Only for demo purpose
[https://bookstores-app.herokuapp.com](https://bookstores-app.herokuapp.com)

#### Note:
This project was tested and CI/CD implemented via Github to Heroku Server.
Strategy for Matrix, node-version: checked for [10.x, 12.x], but don't try it simultaneously for testing, because sails orm cannot handle it by doing sails lift at the same time for multiple request, so do it sequencially.
* For best practices and better performance:
1. CI/CD yml file
```yml
node-version: [10.x, 12.x] -> [12.x]
```
2. package.json
```json
"test": "<instruction> --runInBand"
```
* Quick fix:
1. If heroku server store the caches and not updating the production environment code
```css
heroku restart -a bookstores-app
```

#### Disclaimer
This project is only build for educational purpose

#### Special thanks & gratitude to:
Sails.js Framework, AdminLTE, Jest (by Facebook), Fontawesome, Flaticon & other JS package owners