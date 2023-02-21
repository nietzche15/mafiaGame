const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const http = require('http').Server(app);
require('./roomChat')(http);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database successfully');
  }
});

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new KakaoStrategy(
//     {
//       clientID: 'ec651559127139e56f9dc2e455e69667',
//       clientSecret: 'yWzXJqFVDx4eCtiY1XDTEefcyRHpqL8M',
//       callbackURL: 'http://localhost:3000/kakao',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // authorization 에 성공했을때의 액션
//       console.log(`accessToken : ${accessToken}`);
//       console.log(`사용자 profile: ${JSON.stringify(profile._json)}`);
//       let user = {
//         profile: profile._json,
//         accessToken: accessToken,
//       };
//       return done(null, user);
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   console.log(`user : ${user.profile.id}`);
//   done(null, user);
// });
// passport.deserializeUser(function (obj, done) {
//   console.log(`obj : ${obj}`);
//   done(null, obj);
// });

// app.get(
//   '/kakao',
//   passport.authenticate('kakao', {
//     failureRedirect: '/', // kakaoStrategy에서 실패한다면 실행
//   }),
//   // kakaoStrategy에서 성공한다면 콜백 실행
//   (req, res) => {
//     res.redirect('/lobby');
//   }
// );

// app.use('/auth', authRouter);

http.listen(4000, () => {
  console.log('Server port : ', 4000);
});
