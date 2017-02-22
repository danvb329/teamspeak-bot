# Ethan FREE TeamSpeak BOT

## Disclaimer
I never did pay for a TS3 bot for Tibia, so i might be loosing a point on what a TS3 bot does, but this one satisfaces our war needs

## Why?
Something there is no reason to charge people for a piece of Software, so thats why i made this bot.

## You should know that...

The bot right now (0/22/2017) works only for [Medivia](http://medivia.org/), but it can easy be made it work for Tibia RL or whathever server you are playing on and it have 2 things.

- Web Page.
- Online Page (so the bot can check the Characters you put on the online list).

You **SHOULD** have the ServerQuery avaible on your Teamspeak, if you have a Free teamspeak its a 100% sure, the serverquery its not avaible.

## Get Started.

First of all you should have the following techs installed on your PC.

 1. [Meteor](http://meteor.com/)
 2. [NodeJS](https://nodejs.org/es/)
 3. [NPM](https://www.npmjs.com/)
 4. [GIT](https://git-scm.com/downloads)


The first step will be [git clone](https://git-scm.com/docs/git-clone) this repository.

When the clone is done get into the folder in the preferred command line (depending on the OS) i.e `cd teamspeak-bot`

Then you have to configure the `settings.json` file with the neccesary data.

`credentials.client_login_name` and `credentials.client_login_password` means to the serverquery login access for that you can check [this quick tutorial](http://www.teamspeak3.com/support/teamspeak-3-add-server-query-user.php) or [this youtube video](https://www.youtube.com/watch?v=1xq2GXFJ57Q)

`queryServer.server_address` is your teamspeak server ip

`queryServer.port` is the server query port (defaults to `10022`)

`queryServer.server_id` this is your TEAMSPEAK unique serverid, this could be find on the recipe you get from the provider you buy the TS, using telnet [like is pointed on this post](http://forum.teamspeak.com/threads/47486-Server-ID)

`worldGameData.serverName` stands to `Legacy` for exmaple depending the Medivia Word Game your are playing on.

then when the config is done just run.

`npm install`
`npm run start`

and visit

`http://localhost:3000`.

And you have the BOT working.


## How do Deploy
deploy is even more easy.

you just need to go under the  `.deploy` folder and fill out `mup.js` file [following this README](https://github.com/zodern/meteor-up) and fill out the `settings.json` inside `.deploy` folder with the data as needed.

then just run

`npm run deploy`

## FAQ

#### How do i know if the serverquery is avaible on my TS?.
just use the tool you preffer for ping, like `ping -p 10022 server.ts3.some`, note that `10022` is the default port of the `serverquery`

#### This will work with Tibia RL.

Making this work with other server appart from Medivia its easy, we basically just need to writte a custom `scrapper` and thats it, this will be part of the next releases.

#### Can you help me with the setup?

OFC i can to setup this locally or in a host, just ping me.

#### why we should have 2 separated `settings.json`?

The main reason is because you can have a TEST teamspeak server where you test this bot, before moving in to the actual war server
