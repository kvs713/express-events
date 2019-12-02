#express-events
This is a simple Express service to create new chat room events and then fetch them by time intervals. You can also fetch counts of how many of each type of event took place in a given period of time (still WIP)

MySQL is used to store event data and is required to run this service.

### Installation

`npm install`
`npm install -g nodemon`
`npm install -g sequelize-cli`

This project requires MySQL to be running locally. If you don't already have it installed, check out these options. I prefer the Mac installer from past experience. [https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation.html]

### Setup Scripts:

`npm run init-db` >> You'll need to know where your mysql bin lives to use this (/usr/local/mysql/bin), otherwie you can just create a db called express_events manually.

`npx sequelize db:migrate` >> this will create the table and rows in your existing database.

### Run
`npm run dev`

### Tests
`npm run test` will kick of a suite of Mocha/Chai tests and report back pass/fail and code coverage.

You'll need a separate test db called _express_events_test_ setup and can use `npm run init-test-db` or just create it manually. The test script itself will do the migration and teardown.

### Routes
##### `POST /events` requires date, user, and type to be sent up in body.

request
```
curl -X POST \
  http://localhost:3000/events \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "date": "20050324T019:05:00Z",
    "user": "Jim",
    "type": "enter"
}'
```
returns
```
{"status": "ok"}
```

Event types:
- enter
- leave
- comment > requires message be sent up as well
- highfive > requires otheruser be sent up as well

Examples:
```
{
  date: "20050324T019:05:00Z",
  user: "Jim",
  type: "enter"
}

{
  date: "20050324T019:05:00Z",
  user: "Pam",
  type: "enter"
}

{
  date: "20050324T019:05:00Z",
  user: "Dwight",
  type: "enter"
}

{
  date: "20050324T019:06:00Z",
  user: "Jim",
  type: "highfive",
  otheruser: "Pam"
}

{
  date: "20050324T019:06:00Z",
  user: "Dwight",
  type: "comment",
  message: "disgusting"
}

{
  date: "20050324T019:07:00Z",
  user: "Dwight",
  type: "leave"
}
```

##### `GET /events?from=isoDATE&to=isoDATE` Returns all events in the desired timeframe in ascending order.
request
```
curl -X GET \
  'http://localhost:3000/events?from=1985-10-26T09:00:00Z&to=1985-10-27T09:00:00Z' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
```

returns
```
{
    "events": [
        {
            "date": "1985-10-26T09:30:00.000Z",
            "user": "Doc",
            "type": "enter",
            "message": null,
            "otheruser": null
        },
        {
            "date": "1985-10-26T09:50:00.000Z",
            "user": "Doc",
            "type": "enter",
            "message": null,
            "otheruser": null
        }
    ]
}
```

##### `GET /events/summary` returns counts of actions across a range of time and specified durations. (WIP)
_I did not have a chance to implement date rounding or fetching counts per duration over date range._

request
```
curl -X GET \
  'http://localhost:3000/events/summary?from=1985-10-26T09:00:00Z&to=1985-10-27T10:00:00Z&by=day' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
```

returns
```
{
    "events": {
        "date": "1985-10-27T10:00:00Z",
        "enters": 0,
        "leaves": 1,
        "comments": 3,
        "highfives": 1
    }
}
```

##### `POST /events/clear` Deletes all events (nuclear yo).
request
```
curl -X POST \
  http://localhost:3000/events/clear \
```

returns
```
{"status": "ok"}
```
