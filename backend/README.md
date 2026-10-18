# Backend

Express and Socket.IO API for the brainstorming tool. See the [project README](../README.md) for setup, license, and the TODO list.

```shell
cp .env.example .env
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout server.key \
  -out server.cert \
  -days 365 \
  -subj "/CN=localhost"
npm install
npm start
```

Set `PGPASSWORD` and `SECRET` in `.env` on your machine. `.env`, `server.key`, and `server.cert` are gitignored. Full setup, including the database commands, is in the [project README](../README.md).
