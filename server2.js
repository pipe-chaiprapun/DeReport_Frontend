const express =  require('express')
const path = require('path')
const http = require('http')

const app = express()
const port = process.env.PORT || 80
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

app.use(express.static(__dirname + '/dist/deweb'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname))
})

app.get('*', (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`dist/deweb/${req.url}`));
  } else {
    res.sendFile(path.resolve('dist/deweb/index.html'));
  }
});

console.log(__dirname)
const server = http.createServer(app)

server.listen(port, () => {
    console.log('------ server started ----------')
})