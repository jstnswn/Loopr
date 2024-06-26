# Loopr



[![dashboard.png](https://i.postimg.cc/tg6Dd8rZ/Screen-Shot-2022-02-13-at-10-02-48-PM.png)](https://postimg.cc/cKsQ0kG0)

# Index

* [Live Site](https://loopr-7f64b5b313b0.herokuapp.com/dashboard/photostream)

 | [MVP Feature List](https://github.com/jstnswn/Loopr/wiki/MVP-Feature-List) | [Database Scheme](https://github.com/jstnswn/Loopr/wiki/Database-Schema) | [API Routes](https://github.com/jstnswn/Loopr/wiki/API-Routes) | [Frontend Routes](https://github.com/jstnswn/Loopr/wiki/Frontend-Routes)

# General Overview

Loopr is an image sharing website inspred inspired by [Flickr](https://www.flickr.com/). User can upload their own images, create albums, and browse images from other users.

# Technologies Used

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>


# Local Installation

1. Clone this repository

   ```git clone hhttps://github.com/jstnswn/Loopr.git```

2. CD into the backend directory and install dependencies

    ```npm install```

3. CD into the frontend directory and install dependencies

    ```npm install```

4.  Create a .env file based on the .env.example given (**An AWS S3 account is required to upload and delete images**)

5.  Create a user in psql based on your .env DB_USERNAME

    ```psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"```

6. Create the database, migrate, and seed

    ```npx dotenv sequelize db:create```

    ```npx dotenv sequelize db:migrate```

    ```npx dotenv sequelize db:seed:all```

7. Open up two terminals and cd into the backend and frontend directories, respectively. Start the server in each by running:

    ```npm start```
