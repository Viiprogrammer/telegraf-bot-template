# Telegraf Bot Template

# Installation

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
