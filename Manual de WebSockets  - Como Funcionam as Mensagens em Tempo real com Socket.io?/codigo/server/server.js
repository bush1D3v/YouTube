const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_, res) => res.json({ ok: true }));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('conectado:', socket.id);

  // entrar em uma sala
  socket.on('chat:join', (room) => {
    socket.join(room);
    socket.to(room).emit('chat:sys', `${socket.id} entrou em ${room}`);
  });

  // mensagem para a sala
  socket.on('chat:msg', ({ room, texto }) => {
    io.to(room).emit('chat:msg', { de: socket.id, texto, ts: Date.now() });
  });

  // ping/pong (conceito de ack simples)
  socket.on('ping:client', (msg, ack) => {
    if (ack) ack({ ok: true, now: Date.now(), echo: msg });
  });

  socket.on('disconnect', (reason) => {
    console.log('disconnect:', socket.id, reason);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('HTTP+WS on :' + PORT));
