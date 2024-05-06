## Getting Started

## First - Bootstrap db 
#### Must have docker installed

```bash
docker-compose -f docker-compose.postgres.yml up -d -V --build
```

## Second - install Bun 

Mac
```bash
curl -fsSL https://bun.sh/install | bash
```

windows
```
powershell -c "irm bun.sh/install.ps1 | iex"
```


## Third - Running as a stand alone FE

First, run the development server:

```bash
bun install
bun run dev # for bun
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## build thinking

[X] framework selection and bootstrap
[] deploy to vercel
[] provision DB and connection
[] integration & E2E test
[] implement from 0 bootstrap script for mac (windows? shudder.)
[] implement auth? (stretch)
[] implement rollover? (stetch)
[] TWA / bubble wrap

## Tech stack choices and trade offs

### Big Blocks

- FE/BE - NextJS - fairly standard choice at this point with it really being a wrapper around react, going to use the app router for the first time
- DB - Postgres - Conventional choice and a little more complex to set up than in file sqlite, but wanted to deploy it and have it persist
- CI/CD - Vercel - A bit of an easy choice because of how straight forward the integration into github directly is with a pretty good free tier to boot. First time using
- Hosting - Vercel - For FE/BE, was obvious based on CI/CD choice. Almost went with GAE, but wanted to try Vercel for the first time
- Hosting - Railway - For DB, the new Heroku in a lot of ways, fan of their UI and DX with a pretty good free tier

#### Smaller choices

- i18n

#### Skipped choices

- i18n - doesn't feel critical
- A18y - not an active choice to try and aheard to level 2 or something

## Product thinking (don't over think it)

"Rooms" are the collection unit.

Users are members of rooms
Users have a favorite order
Users can add an order

Rooms can be split even / by price / rolled over (strech)
