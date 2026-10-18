const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const passport = require('./middlewares/passportMiddleware');
const routes = require('./routes');
const registerSocketHandlers = require('./socket');

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 3000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:4200';

const io = new Server(httpServer, {
  cors: {
    origin: clientOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: clientOrigin,
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use('/', routes);

registerSocketHandlers(io, sessionMiddleware, passport);

instrument(io, {
  auth: false,
  mode: 'development',
});

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
