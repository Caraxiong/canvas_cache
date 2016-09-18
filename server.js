const fs = require('fs')
const http = require('http')
const url = require('url')
const querystring = require('querystring')
const util = require('util')
 
const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname
  let realPath = 'assets' + pathname
  console.log(realPath)
  if (realPath !== 'assets/upload') {
     fs.readFile(realPath, "binary", function(err, file) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'})
        res.end(err)
      } else {
        res.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'image/png',
          'ETag': "666666",
          'Cache-Control': 'public, max-age=31536000',
          'Expires': 'Mon, 07 Sep 2026 09:32:27 GMT'
        })
        res.write(file, "binary")
        res.end()
      }
   })
  } else {
    let post = ''
    req.on('data', (chunk) => {
      post += chunk
    })
    req.on('end', () => {
      post = querystring.parse(post)
      console.log(post.imgData)
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
      })
      let base64Data = post.imgData.replace(/^data:image\/\w+;base64,/, "")
      let dataBuffer = new Buffer(base64Data, 'base64')
      fs.writeFile('assets/out.png', dataBuffer, (err) => {
        if (err) {
          res.write(err)
          res.end()
        }
        res.write('OK')
        res.end()
      })
    })
  }
})
 
server.listen(80)
 
console.log('Listening on port: 80')