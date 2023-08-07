# Bootcamp Directory API

> Backend RESTful API For Bootcamp Directory App to manage bootcamps, courses, reviews, users and authentications.

## Setup
Clone the repository
```
git clone https://github.com/atanuc13/bootcamp-directory-api.git
```

Go to config/config.env file and provide configurations for DB connection, GeoCoder and SMTP server.


## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Demo
After succesfully executing above steps, the postman collection can be imported from
 [here](https://documenter.getpostman.com/view/25160156/2s9XxySZLa) or [here](./public/BootcampDirectory.postman_collection.json)
