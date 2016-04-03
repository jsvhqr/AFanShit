// set up ========================
  var express  = require('express');
  var app      = express();

  app.use(express.static('/home/jsvhqr/DevWeb/AFanShit/src/webapp'));// set the static files location /public/img will be /img for users

  // listen (start app with node server.js) ======================================
  app.listen(8080);
  console.log("App listening on port 8080");
