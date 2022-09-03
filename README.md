# Disconnecting DB

## Setup
1. Install [Docker](https://docs.docker.com/engine/install/)
2. Run `npx prisma migrate deploy` to apply db migrations
3. Run `npx prisma generate` to generate Prisma client
4. Run `npm run db:clear` to run [clear-db](./clear-db.ts) to clear db rows

## How to reproduce error
1. Run `npm start` to run [script](./script.ts) and do the following:
   - Create lots of Users
   - Create FriendRequests for every User combination
   - Fetch a large subset of the FriendRequests (error occurs here)
