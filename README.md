# Telegraf Bot Template
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/810311f9a3f3440d914e61d252723064)](https://www.codacy.com/gh/Viiprogrammer/telegraf-bot-template/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Viiprogrammer/telegraf-bot-template&amp;utm_campaign=Badge_Grade)

## Installation

We advise you to install all dev dependencies locally (linters, etc):

`npm install`

Don't forget to create `.env` (from `.env.example`).

## Run

To run use:

`npm run start`

To run the dev version use:

`npm run dev`

To run the eslint use:

`npm run lint`

### Docker installation
1) Pull this repo
2) Run `cp .env.example .env`
3) Edit `.env` file
4) Run `docker-compose up -d`

### PM2 installation
1) Pull this repo
2) Run `cp .env.example .env`
3) Edit `.env` file
4) Run `pm2 start`
