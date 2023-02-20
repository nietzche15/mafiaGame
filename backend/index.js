const express = require('express');
const app = express();
const http = require('http').Server(app);
require('./roomChat')(http);

http.listen(4000, () => {
  console.log('Server port : ', 4000);
});
