# Meals memory

A simple application storing all your meals and your invitees, so you can remember easily what you cooked for your friends. Now, you are sure to not cook the same things 2 times.

This app is not a service. If you want to use this app, deploy it on your own server.

## Heroku Installation

* Create an account and a database on [MongoLab](https://mongolab.com/welcome/)
* Create an account and an application on [Heroku](https://www.heroku.com/)
* Run `git clone git@github.com:kdisneur/meals_memory`
* Run `cd meals_memory`
* Run `./bootsrap.sh` to generate a settings file (MongoDB authentication) and an htaccess (to protect your application)
* Add Heroku remote `git remote add heroku git@heroku.com:<YOUR_HEROKU_APP>.git`
* And you can push your application `git push heroku`
