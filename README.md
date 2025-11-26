# Project details

This project functions as a server for sending and receiving messages in a socket-type chat through private channels. These same channels can be used in any project, as long as they can use a dependency that allows socket connection. In this case, three types of frontend projects were used: Angular, React, and Ionic Angular. A chat can be established between all projects without any problems.

## Important note

None of these projects use a database on a server to store messages. Work is currently underway to add this requirement.


|                |Version							|
|----------------|-------------------------------|
|NPM          |`11.5.2`            |
|Node.js          |`22.14.0`|
|Docker          ||

## Instructions

To run socket events to send and receive messages, follow these steps:

- Clone the project, either with the command git clone `https://github.com/dev-shelvin-batista/nodejs-socket-server-chat.git` or using a GitHub graphical tool.

- After cloning the repository, install the node dependencies using the command `npm install` inside the `nodejs-socket-server-chat` project folder. If an error occurs, add the --force option.

- Run the command `npm run start` to start the server. By default, the url `http://localhost:4000` is used.

## Docker Instructions

To run the frontend project in a Docker container, follow these steps:

- Clone the project, either with the command git clone ``https://github.com/dev-shelvin-batista/nodejs-socket-server-chat.git` or using a GitHub graphical tool.

- Access the folder in a command terminal using the cd command.

- The project already has a Dockerfile that generates the image to create the container. Just create the image with the `docker build -t nodejs-socket-server-chat .` command.

- Create the container from the image created by running the `docker run --rm -p 4000:4000 nodejs-socket-server-chat` command.

- After executing the above command, the container will be active and you will be able to access the socket server in frontend projects from the host using the URL. `http://localhost:4000`.

- You can change the port to be used on the host by modifying the port in the **docker run** command in the **-p** option.