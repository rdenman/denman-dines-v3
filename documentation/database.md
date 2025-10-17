# Database

## Backups

Backups can be taken using the `pg_dump` tool:

```sh
pg_dump --dbname="postgres://USER:PASSWORD@db.prisma.io:5432/postgres?sslmode=require" > ./denman-dines-MM-DD-YYYY.bak
```

Get the connection string via [Prisma Data console](https://console.prisma.io/clnkchbti006rrx0hazny6pk8/cmdwc6fwy06r4zz0vad55pfny/cmdwcv4d806ryzz0vqej1zzt2/studio#table=User&schema=public&view=table).

## Migrations

To make changes to the database, update the schema in `schema.prisma` with the desired changes, then run

```sh
npx prisma migrate dev --name my-migration-name
```

### Seeding

To seed the database, run

```sh
npx prisma db seed
```

### Errors

If there's an error around migrations being out of sync, just drop the dev database by runnings

```sh
npx prisma migrate reset
```
