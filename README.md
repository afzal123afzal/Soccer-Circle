# Soccer-Circle
# Soccer-Circle
Welcome to the Soccer Circle project! Our goal is to connect talented, hidden football players with the right clubs and channels. We believe that every player deserves a chance to showcase their skills, and our platform aims to make that happen.

Features
A player registration system where players can create a profile 
A club registration system where clubs can create a profile and search for players
A matching system that connects players with clubs 

# Serenity


## Table of contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Technology](#technology)
- [Features](#features)
- [Run&nbsp;Backend](#runbackend)
- [Run&nbsp;Client&nbsp;Side](#runclientside)


## Introduction

A  web platform to s to connect talented, hidden football players with the right clubs and channels built using React, Node js, Express js, and MongoDb.

NOTE: Please read the RUN section before opening an issue.
>Warning: SoccerCircle is still in development, constantly being optimized and isn't still stable enough to be used in production environments
## Demo

![This is an image]
![This is an image]

Soccer circle is a website that aimed to connect hidden football players with proper channels and football clubs, as well as helping clubs find new players in their area. The website allows players to create a profile and showcase their skills and experience, while also allowing clubs to search and find potential players



## Technology

The application is built with:

- React.js
- Node.js
- MongoDB
- Express
- Tailwind
- Stripe
- Material UI
- Socket.IO
- Redux
- Nodemailer(ongoing)


## Features

- SignUp, and log in With the JWT token, OTP verification
- Admin Page, Block User
- Create, Edit, Delete Post
- Live Chat, Integrated with Socket I/O
- Connect with player and clubs
- Payment using stripe 


## Run&nbsp;Backend

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- MONGO_URI : This is the MongoDB Connection Url (string).

- JWT_SECRET : This is the JWT SECRET ID (string).

- BASE_URL: This is the Base URL of Website (string).

- PORT: Specify the port Number

- Also you need to insert admin username and password in database eg:{username:"admin",password:"12345"} (ongoing)

After you've set these environmental variables in the .env file at the root of the project, and intsall node modules using npm install

Now you can run npm start in the terminal and the application should work.


## Run&nbsp;Client&nbsp;Side

intsall node modules using npm install

Now you can run npm run dev in the terminal and the Client Side should start working.

## Copyright

Copyright 2023 © [Mohammed Afzal](https://github.com/afzal123afzal)

