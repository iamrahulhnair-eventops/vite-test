import http from 'http';
import { parse } from 'url';

const PORT = process.env.PORT || 3001;

function requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
  const { pathname } = parse(req.url || '', true);

  // Set common headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'eventops-lite');

  if (pathname === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Welcome to the lightweight server!' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
}

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Lightweight server running at http://localhost:${PORT}`);
});
