const OpenVidu = require('openvidu-node-client').OpenVidu;
const express = require('express');
const router = express.Router();
require('dotenv').config();

const openvidu = new OpenVidu(
  (OPENVIDU_URL = context.getEnvironment().getProperty('openvidu-url')),
  (OPENVIDU_SECRET = context.getEnvironment().getProperty('openvidu-secret'))
);

console.warn('Application server connecting to OpenVidu at ' + OPENVIDU_URL);

router.post('/openvidu/api/sessions', async (req, res) => {
  console.log('session 연결');
  const session = await openvidu.createSession(req.body);
  res.send(session.sessionId);
});

router.post(
  '/openvidu/api/sessions/:sessionId/connections',
  async (req, res) => {
    console.log('그 다음 연결');
    const session = openvidu.activeSessions.find(
      (s) => s.sessionId === req.params.sessionId
    );
    if (!session) {
      res.status(404).send();
    } else {
      const connection = await session.createConnection(req.body);
      res.send(connection.token);
    }
  }
);

process.on('uncaughtException', (err) => console.error(err));

module.exports = route;
