# image-workspace
Monorepo for image workspace project (Playground for a workspace-driven collaborative radio astronomy image viewer and analysis tool).

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