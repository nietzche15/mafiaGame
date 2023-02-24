import Peer from 'simple-peer';
import { socket } from '../../utils/socket';

function getNewPeer(stream, initiator = false) {
  const peer = new Peer({
    initiator,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
      ],
    },
    trickle: false,
    stream,
  });
  return peer;
}

function createPeer(userToSignal, callerID, stream) {
  const peer = getNewPeer(stream, true);
  peer.on('signal', (signal) => {
    socket.emit('sending signal', {
      userToSignal,
      callerID,
      signal,
    });
  });
  console.log(peer);
  return peer;
}

function addNewPeer(incomingSignal, callerID, stream) {
  const peer = getNewPeer(stream);
  peer.on('signal', (signal) => {
    socket.emit('returning signal', { signal, callerID });
  });
  peer.signal(incomingSignal);
  return peer;
}

const initialState = {
  peers: [],
  stream: undefined,
};

const SET_PEERS = 'SET_PEERS';
const ADD_PEER = 'ADD_PEER';
const SET_STREAM = 'SET_STREAM';

export const setPeers = (users) => ({
  type: SET_PEERS,
  payload: { users },
});

export const addPeer = (signal, callerID) => ({
  type: ADD_PEER,
  payload: { signal, callerID },
});

export const setStream = (stream) => ({
  type: SET_STREAM,
  paylaod: { stream },
});

const StreamReducer = (state = initialState, action) => {
  switch (action.payload) {
    case SET_STREAM: {
      console.log(stream);
      return { ...state, stream: action.payload.stream };
    }
    case ADD_PEER:
      return {
        ...state,
        peers: [
          ...state.peers,
          addNewPeer(
            action.payload.signal,
            action.payload.callerID,
            state.stream
          ),
        ],
      };
    case SET_PEERS: {
      console.log(state.stream);
      console.log(socket.id);
      const newPeers = action.payload.users.map((user) =>
        createPeer(user, socket.id, state.stream)
      );
      return {
        ...state,
        peers: newPeers,
      };
    }
    default:
      return state;
  }
};

export default StreamReducer;
