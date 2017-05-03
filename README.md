[![npm version](https://badge.fury.io/js/react-action-cable-fixed.svg)](https://badge.fury.io/js/react-action-cable-fixed)
[![Bower version](https://badge.fury.io/bo/react-action-cable-fixed.svg)](https://badge.fury.io/bo/react-action-cable-fixed)

# Newcomers app

This is a Ruby on Rails app that displays the "Top 10 Newcomers" on Hacker News. Newcomers are the newest 500 submissions to HN. The Newcomer has a higher rank if it has a higher average rate of point growth. As an example: If submission A received 20 new points per time unit on average for its lifetime, and submission B only 15, then submission A is on rank 1 and B on rank 2. Obviously, the "Top 10 Newcomers" list should always show the best ten according to the ranking criterion described.

## Requirements
- Ruby
- Rails 5
- Redis
- React.js
- Npm
- Node

## Stack
The backend is built on Rails 5 in API mode and the frontend is a React.js app. The package is prepared to be deployed to Heroku. (Add CircleCI & Tests)

Moreover, it uses ActionCable to deal with real-time communications. There is a rake task (`/lib/tasks/scheduler.rake`) called `send_notification` that acts as a cron in Heroku. When it runs, it calls an API endpoints exposed by the backend that checks if there has been updates in HN and, if there are, it sends a notification to the frontend.

## Usage

Find below the commands to get the app running locally:

* `git clone https://git.heroku.com/battereapp.git && cd battereapp` *(Clone repo)*
* `cd client && npm i` *(Installs npm dependencies)*
* `redis-server` *(Starts redis server, **must be** done in a new terminal)*
* `rake start`* *(or `rake start:development`)*

\* ***rake start** is responsible for executing Procfile. You can execute it using an envinronment variable (development or production)*

You can access the app deployed in Heroku [here](https://battereapp.herokuapp.com/).
**IMPORTANT:** The app uses ActionCable to deal with real-time communications. There is a rake task (`/lib/tasks/scheduler.rake`) called `send_notification` that acts as a cron in Heroku. When it runs, it calls an API endpoint (`/api/notify`) exposed by the backend that checks if there has been updates in HN and, if there are, it sends a notification to the frontend. The crons runch every 10 minutes (minimum for free). 
So, if you want to test this, you can simply call the api endpoint in the browser or you can also execute the cron manually, you can run `heroku rake send_notification` in the terminal (you have to be in the project directory and you must be a collaborator.

## API endpoints

Method | Endpoint | Description
--- | --- | ---
GET | `/api/newcomers` | Returns all the candidates for newcomers (the 500 newest stories from HN)
GET | `/api/newcomers/topten` | Returns the top 10 newcomers, ranked by average rate of point growth (points per hour on average for its lifetime)
GET | `/api/notify` | Returns the 500 newest stories (retrieved from HN)

## TODO

Important things nice to have:
- Rspec tests
- Continuous Integration (maybe with CircleCI)
- Display somewhere a current record holder with the fastest growth per time unit yet (update, if necessary, with every refresh). It should be saved in a persistent database (e.g. PostgreSQL or MySQL) 

## Considerations
- Events component (`/client/src/Events.js`) is **not** written in ES6 as it uses mixins. This could be done by refactoring the code and converting it to ES6 or using some decorator like [this](https://www.npmjs.com/package/react-mixin-decorator) one.

## License

MIT
