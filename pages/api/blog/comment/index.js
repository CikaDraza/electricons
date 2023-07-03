import nc from 'next-connect';
import Comment from '../../../../models/Comment';
import db from '../../../../src/utils/db';
import { Server } from 'socket.io';

const handler = nc();

handler.get(async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const io = new Server(req.socket.server, {
    path: '/api/blog/comment/socket.io', // Podešavanje putanje za socket.io
  });

  await db.connect();
  const comments = await Comment.find({});
  await db.disconnect();
  res.send(comments);

  comments.forEach((comment) => {
    res.write(`data: ${JSON.stringify(comment)}\n\n`);
  });

  // Kreiranje MongoDB change stream-a koji će pratiti promene u komentarima
  const changeStream = Comment.watch();

  // Slušanje promena u komentarima i slanje ažuriranja putem WebSocket-a
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const newComment = change.fullDocument;
      console.log('New comment:', newComment);
      io.emit('newComment', newComment);
    }
  });

  // Rukovanje prekidom veze sa klijentom
  req.on('close', () => {
    changeStream.close();
    res.end();
  });
});

export default handler;
