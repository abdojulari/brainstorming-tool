const shapes = {};

module.exports = (io, sessionMiddleware, passport) => {
  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, socket.request.res, next);

  io.use(wrap(sessionMiddleware));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));

  io.use((socket, next) => {
    const user = socket.request?.session?.passport?.user;
    if (!user) {
      return next(new Error('Authentication failed. Please provide a valid user.'));
    }
    return next();
  });

  io.on('connection', (socket) => {
    const shapeTypes = ['Circle', 'Rect', 'Line', 'Arrow', 'Text'];

    shapeTypes.forEach((shapeType) => {
      socket.on(`create${shapeType}`, (shapeData) => {
        shapes[shapeData.id] = shapeData;
        io.emit(`create${shapeType}`, shapeData);
      });

      socket.on(`update${shapeType}`, (shapeData) => {
        shapes[shapeData.id] = shapeData;
        io.emit(`update${shapeType}`, shapeData);
      });
    });

    socket.on('bringToFront', (data) => {
      socket.broadcast.emit('bringToFront', data);
    });

    socket.on('sendToBack', (data) => {
      socket.broadcast.emit('sendToBack', data);
    });

    socket.on('deleteShape', (data) => {
      socket.broadcast.emit('deleteShape', data);
    });

    socket.on('textUpdate', (data) => {
      io.emit('textUpdate', data);
    });

    socket.on('updateText', (data) => {
      io.emit('updateText', data);
    });

    socket.emit('existingShapes', Object.values(shapes));

    socket.on('newImage', (imageData) => {
      io.emit('newImage', imageData);
    });

    socket.on('updateImage', (imageData) => {
      io.emit('updateImage', imageData);
    });

    socket.on('draw', (data) => {
      io.emit('draw', data);
    });

    socket.on('erase', (data) => {
      io.emit('erase', data);
    });

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });
};
