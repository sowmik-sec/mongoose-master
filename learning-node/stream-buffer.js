const http = require("http");

// creating a server using row node.js
const server = http.createServer();

// listener
server.on("request", (req, res) => {
  console.log(req);
  res.end("hello cuck");
});

server.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});
