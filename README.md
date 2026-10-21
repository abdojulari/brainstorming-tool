# Brainstorming Tool

A collaborative brainstorming app. The Angular client provides a shared whiteboard, sticky notes, and chat. The Node.js backend authenticates users with Passport and PostgreSQL, then syncs whiteboard and chat events over Socket.IO.

## Layout

- `client/` — Angular app (Konva whiteboard, sticky notes, chat, login)
- `backend/` — Express API and Socket.IO server

## Commands

Install [Node.js](https://nodejs.org/) and PostgreSQL first. Run the shell commands from the repository root unless a block says otherwise.

### Database

```shell
createdb prototype
psql -d prototype -c "CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name VARCHAR(255),
  roles TEXT
);"
psql -d prototype -c "CREATE TABLE user_session (
  sid VARCHAR NOT NULL PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);"
psql -d prototype -c "CREATE INDEX IDX_user_session_expire ON user_session (expire);"
```

`prototype` matches `PGDATABASE` in `backend/.env.example`.

### Environment files

```shell
cp backend/.env.example backend/.env
cp client/.env.example client/.env
```

Set `PGPASSWORD` and `SECRET` in `backend/.env`. Both `.env` files are gitignored. The client reads `apiUrl` from `client/src/environments/environment.ts`; keep that value the same as `API_URL` in `client/.env`.

### Local TLS certificate

`server.cert` and `server.key` stay in `backend/` and are gitignored. Generate a new self-signed pair for localhost:

```shell
cd backend
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout server.key \
  -out server.cert \
  -days 365 \
  -subj "/CN=localhost"
```

`-nodes` leaves the key unencrypted so a local process can read it. Do not commit `server.key`, `server.cert`, or `server.csr`.

### Backend

```shell
cd backend
npm install
npm start
```

Restart on file changes:

```shell
cd backend
npm run dev
```

The API listens on port `3000`.

### Client

```shell
cd client
npm install
npm start
```

Other client commands:

```shell
cd client
npm run build
npm test
```

The client runs at `http://localhost:4200` and talks to the API at `http://localhost:3000`.

Accounts are created with `POST /join` (`username`, `password`, `name`, `roles`). Passwords are hashed before they are stored. Login is `POST /login`. Logout is `GET /logout`.

## License

MIT License

Copyright (c) 2026 Brainstorming Tool contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## TODO

- [ ] Add a registration screen for `POST /join` (the API exists; the UI does not)
- [ ] Persist boards and shapes in PostgreSQL (shapes currently live in memory and reset when the server restarts) and get purged after session ends
- [ ] Support multiple boards so separate sessions do not share one canvas
- [ ] Sync sticky notes over Socket.IO (they are stored in `localStorage` only)
- [ ] Share one authenticated socket between the whiteboard and chat
- [ ] Restore a saved stage from `localStorage` when the confirm dialog is accepted
- [ ] Validate and rate-limit `/join` and `/login`
- [ ] Add API and UI tests

