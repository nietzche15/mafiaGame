// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Checkbox, Typography } from '@mui/material';
// import { socket } from '../../utils/socket';
// import JobMemo from './JobMemo';
// import Vote from './Vote';
// import Peer from 'simple-peer';
// import styled from 'styled-components';
// import ImgContainer from './ImgContainer';
// import GlobalStyle from '../common/GlobalStyle';
// import { getUserList } from '../../store/modules/room';
// const videoConstraints = {
//   height: 200,
//   width: 200,
// };

// const StyledVideo = styled.video`
//   border-radius: 10px;
// `;
// const VideoViewer = (props) => {
//   const ref = useRef();
//   /* eslint-disable */
//   useEffect(() => {
//     props.peer.on('stream', (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, []);
//   return <StyledVideo playsInline autoPlay ref={ref} />;
// };


export default function Video({ name }) {
  const { timeStatus } = useSelector((state) => state.status);
  const { mySocketId, myJob, killedUserList } = useSelector(
    (state) => state.room
  );

// export default function Video() {
//   const { roomID, mySocketId, myJob, userList, killedUserList } = useSelector(
//     (state) => state.room
//   );
//   const [peers, setPeers] = useState([]);
//   const socketRef = useRef();
//   const userVideo = useRef();
//   const peersRef = useRef([]);
//   const [peersLen, setPeersLen] = useState(peers?.length || 0);
//   const { timeStatus } = useSelector((state) => state.status);
//   const [vidList, setVidList] = useState();
//   useEffect(() => {
//     userList[1] === ''
//       ? setVidList(userList.slice(1))
//       : setVidList(userList.filter((e) => e !== socket.id));
//   }, [userList]);
//   const dispatch = useDispatch();
//   console.log('userList:', userList);
//   console.log(userList[0] === socket.id);
//   console.log(userList.slice(1));
//   console.log('vidList: ', vidList);

//   useEffect(() => {
//     socketRef.current = socket;
//     console.log('--------------------------[1] getUserMedia');
//     navigator.mediaDevices
//       .getUserMedia({ video: videoConstraints, audio: true })
//       .then((stream) => {
//         userVideo.current.srcObject = stream;
//         socketRef.current.emit('join room', roomID);
//         socketRef.current.on('all users', (users) => {
//           dispatch(getUserList([...users]));
//           console.log('--------------------------[2] all users');
//           const peers = [];
//           users.forEach((userID) => {
//             const peer = createPeer(userID, socketRef.current.id, stream);
//             peersRef.current.push({
//               peerID: userID,
//               peer,
//             });
//             peers.push(peer);
//           });
//           setPeers(peers);
//         });
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#8B7F70',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        width: 465,
      }}
      onClick={onClickKill}
    >
      <Box>
        <Box
          sx={{
            mt: 1,
            width: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D9D9D9',
            borderRadius: '10px',
            mr: 2,
          }}
        >
          <Typography variant="h7" component="div">
            {name}
          </Typography>
          <Checkbox disabled sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
        </Box>
        <Box
          sx={{
            width: '200px',
            backgroundColor: '#D9D9D9',
            mt: 1,
            borderRadius: '10px',
          }}
        >
          <JobMemo name={name} />
        </Box>
        <Box
          sx={{
            width: '200px',
            backgroundColor: '#D9D9D9',
            mt: 1,
            borderRadius: '10px',
          }}
        >
          {name === mySocketId ? <Vote /> : null}
        </Box>
      </Box>

//         socketRef.current.on('user joined', (payload) => {
//           console.log('--------------------------[3] user joined');
//           const peer = addPeer(payload.signal, payload.callerID, stream);
//           peersRef.current.push({
//             peerID: payload.callerID,
//             peer,
//           });

//           setPeers((users) => [...users, peer]);
//         });

//         socketRef.current.on('receiving returned signal', (payload) => {
//           console.log(
//             '--------------------------[4] receiving returned signal'
//           );
//           const item = peersRef.current.find((p) => p.peerID === payload.id);
//           item.peer.signal(payload.signal);
//         });
//       });
//   }, []);

//   function createPeer(userToSignal, callerID, stream) {
//     console.log('--------------------------[5] createPeer');
//     const peer = new Peer({
//       initiator: true,
//       config: {
//         iceServers: [
//           { urls: 'stun:stun.l.google.com:19302' },
//           { urls: 'stun:stun4.l.google.com:19302' },
//         ],
//       },
//       trickle: false,
//       stream,
//     });

//     peer.on('signal', (signal) => {
//       socketRef.current.emit('sending signal', {
//         userToSignal,
//         callerID,
//         signal,
//       });
//     });

//     return peer;
//   }

//   function addPeer(incomingSignal, callerID, stream) {
//     console.log('--------------------------[6] addPeer');
//     const peer = new Peer({
//       initiator: false,
//       config: {
//         iceServers: [
//           { urls: 'stun:stun.l.google.com:19302' },
//           { urls: 'stun:stun4.l.google.com:19302' },
//         ],
//       },
//       trickle: false,
//       stream,
//     });

//     peer.on('signal', (signal) => {
//       console.log('--------------------------[7] signal');
//       socketRef.current.emit('returning signal', { signal, callerID });
//     });
//     peer.signal(incomingSignal);
//     return peer;
//   }

//   const onClickKill = () => {
//     if (myJob === 'mafia' && timeStatus === 'night') {
//       socket.emit('mafiaVoted', { killed_id: name, from_id: mySocketId });
//     }
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <Box sx={{ fontFamily: 'MaplestoryOTFBold' }}>
//         {/* MY VIDEO */}
//         <Box>
//           <Box
//             sx={{
//               p: 2,
//               backgroundColor: '#8B7F70',
//               borderRadius: '10px',
//               display: 'flex',
//               justifyContent: 'center',
//               width: 465,
//             }}
//             onClick={onClickKill}
//           >
//             <Box>
//               <Box
//                 sx={{
//                   mt: 1,
//                   width: '200px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: '#D9D9D9',
//                   borderRadius: '10px',
//                   mr: 2,
//                 }}
//               >
//                 <Typography variant="h7" component="div">
//                   {socket.id}
//                 </Typography>
//                 <Checkbox
//                   disabled
//                   sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   width: '200px',
//                   backgroundColor: '#D9D9D9',
//                   mt: 1,
//                   borderRadius: '10px',
//                 }}
//               >
//                 <JobMemo name={mySocketId} />
//               </Box>
//               <Box
//                 sx={{
//                   width: '200px',
//                   backgroundColor: '#D9D9D9',
//                   mt: 1,
//                   borderRadius: '10px',
//                 }}
//               >
//                 <Vote name={userList} />
//               </Box>
//             </Box>
//             <Box
//               sx={{
//                 width: '200px',
//                 height: '200px',
//                 backgroundColor: '#E4D9C6',
//                 borderRadius: '10px',
//               }}
//             >
//               {killedUserList.includes(mySocketId) ? (
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     width: '200px',
//                     height: '200px',
//                     backgroundColor: '#171717',
//                     borderRadius: '10px',
//                   }}
//                 >
//                   <img
//                     src="./images/killimg.png"
//                     alt="killimg"
//                     style={{
//                       position: 'absolute',
//                       width: '200px',
//                       height: '200px',
//                       backgroundColor: '#171717',
//                       borderRadius: '10px',
//                     }}
//                   />
//                 </Box>
//               ) : null}
//               <StyledVideo muted ref={userVideo} autoPlay playsInline />
//             </Box>
//           </Box>
//         </Box>
//         {/* PEER VIDEO
//           index < 3 : left-side,
//           index >=3 : right-side
//           */}
//         {Array(7)
//           .fill('')
//           .map((e, i) => (peers[i] ? peers[i] : e))
//           .map((peer, index) => {
//             return index < 3 ? (
//               peer === '' ? (
//                 <Box key={index}>
//                   <ImgContainer />
//                 </Box>
//               ) : (
//                 <Box key={index}>
//                   <Box
//                     sx={{
//                       p: 2,
//                       backgroundColor: '#8B7F70',
//                       borderRadius: '10px',
//                       display: 'flex',
//                       justifyContent: 'center',
//                       width: 465,
//                     }}
//                     onClick={onClickKill}
//                   >
//                     <Box>
//                       <Box
//                         sx={{
//                           mt: 1,
//                           width: '200px',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           backgroundColor: '#D9D9D9',
//                           borderRadius: '10px',
//                           mr: 2,
//                         }}
//                       >
//                         <Typography variant="h7" component="div">
//                           {vidList[index]}
//                         </Typography>
//                         <Checkbox
//                           disabled
//                           sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
//                         />
//                       </Box>
//                       <Box
//                         sx={{
//                           width: '200px',
//                           backgroundColor: '#D9D9D9',
//                           mt: 1,
//                           borderRadius: '10px',
//                         }}
//                       >
//                         <JobMemo name={vidList[index]} />
//                       </Box>
//                       <Box
//                         sx={{
//                           width: '200px',
//                           backgroundColor: '#D9D9D9',
//                           mt: 1,
//                           borderRadius: '10px',
//                         }}
//                       >
//                         <Vote name={userList} />
//                       </Box>
//                     </Box>
//                     <Box
//                       sx={{
//                         width: '200px',
//                         height: '200px',
//                         backgroundColor: '#E4D9C6',
//                         borderRadius: '10px',
//                       }}
//                     >
//                       {killedUserList.includes(vidList[index]) ? (
//                         <Box
//                           sx={{
//                             position: 'absolute',
//                             width: '200px',
//                             height: '200px',
//                             backgroundColor: '#171717',
//                             borderRadius: '10px',
//                           }}
//                         >
//                           <img
//                             src="./images/killimg.png"
//                             alt="killimg"
//                             style={{
//                               position: 'absolute',
//                               width: '200px',
//                               height: '200px',
//                               backgroundColor: '#171717',
//                               borderRadius: '10px',
//                             }}
//                           />
//                         </Box>
//                       ) : null}
//                       <VideoViewer key={index} peer={peer} />
//                     </Box>
//                   </Box>
//                 </Box>
//               )
//             ) : peer === '' ? (
//               <Box
//                 key={index}
//                 sx={{
//                   position: 'absolute',
//                   right: 0,
//                   top: 232 * (index - 3),
//                   width: '50vw',
//                   zIndex: 5000,
//                 }}
//               >
//                 <Box sx={{ float: 'right' }}>
//                   <ImgContainer />
//                 </Box>
//               </Box>
//             ) : (
//               <Box
//                 key={index}
//                 sx={{
//                   position: 'absolute',
//                   right: 0,
//                   top: 232 * (index - 3),
//                   width: '50vw',
//                   zIndex: 5000,
//                 }}
//               >
//                 <Box sx={{ float: 'right' }}>
//                   <Box
//                     sx={{
//                       p: 2,
//                       backgroundColor: '#8B7F70',
//                       borderRadius: '10px',
//                       display: 'flex',
//                       justifyContent: 'center',
//                       width: 465,
//                       display: 'inline-block',
//                     }}
//                     onClick={onClickKill}
//                   >
//                     <Box>
//                       <Box
//                         sx={{
//                           mt: 1,
//                           width: '200px',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           backgroundColor: '#D9D9D9',
//                           borderRadius: '10px',
//                           mr: 2,
//                         }}
//                       >
//                         <Typography variant="h7" component="div">
//                           {vidList[index]}
//                         </Typography>
//                         <Checkbox
//                           disabled
//                           sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
//                         />
//                       </Box>
//                       <Box
//                         sx={{
//                           width: '200px',
//                           backgroundColor: '#D9D9D9',
//                           mt: 1,
//                           borderRadius: '10px',
//                         }}
//                       >
//                         <JobMemo name={vidList[index]} />
//                       </Box>
//                       <Box
//                         sx={{
//                           width: '200px',
//                           backgroundColor: '#D9D9D9',
//                           mt: 1,
//                           borderRadius: '10px',
//                         }}
//                       >
//                         <Vote name={userList} />
//                       </Box>
//                     </Box>
//                     <Box
//                       sx={{
//                         width: '200px',
//                         height: '200px',
//                         backgroundColor: '#E4D9C6',
//                         borderRadius: '10px',
//                       }}
//                     >
//                       {killedUserList.includes(vidList[index]) ? (
//                         <Box
//                           sx={{
//                             position: 'absolute',
//                             width: '200px',
//                             height: '200px',
//                             backgroundColor: '#171717',
//                             borderRadius: '10px',
//                           }}
//                         >
//                           <img
//                             src="./images/killimg.png"
//                             alt="killimg"
//                             style={{
//                               position: 'absolute',
//                               width: '200px',
//                               height: '200px',
//                               backgroundColor: '#171717',
//                               borderRadius: '10px',
//                             }}
//                           />
//                         </Box>
//                       ) : null}
//                       <VideoViewer key={index} peer={peer} />
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             );
//           })}
//       </Box>
//     </>
//   );
// }
