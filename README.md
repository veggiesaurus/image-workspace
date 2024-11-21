# image-workspace
Monorepo for image workspace project (Playground for a workspace-driven collaborative radio astronomy image viewer and analysis tool).
This is very much an exploratory project and is really just aimed at developing a proof of concept for what CARTA _might_ have looked like if we'd taken a workspace-, collaboration- and versioning-driven approach from the start.

Some of this is inspired from ideas from two great talks by Tuomas Artman (co-founder of Linear):
- [Realtime sync in linear](https://www.youtube.com/watch?v=WxK11RsLqp4&t=2175s)
- [Scaling the Linear sync engine](https://www.youtube.com/watch?v=Wo2m3jaJixU)


## Installation

To install dependencies for all packages:

```bash
bun install
```


## Backend
The backend requires PostgreSQL to be installed and running. Edit the `packages/backend/.env` file to set the `DATABASE_URL` environment variable to the connection string for your PostgreSQL database.

To run:
```bash
cd packages/backend
bun start
```
## Frontend
To run the development server:
```bash
cd packages/frontend
bun dev
```
