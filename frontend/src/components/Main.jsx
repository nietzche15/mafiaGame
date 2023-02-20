import React from 'react';
import GlobalStyle from './common/GlobalStyle';
import Rules from './Rules';
import './styles/main.css';

export default function Main() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=openid,account_email,talk_message`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const naver_api_url =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
    '27NfAweZlVIdEWFecF3p' +
    '&redirect_uri=' +
    'http://localhost:3000/naver' +
    '&state=' +
    '1234';

  const naverLogin = () => {
    window.location.href = naver_api_url;
  };

  return (
    <>
      <GlobalStyle />
      <div className="back">
        <div className="wrapper">
          <div className="a">
            <img src="./images/mafiaImg.png" style={{ width: '80%' }}></img>
          </div>
          <div className="b">
            <Rules />
          </div>
          <div className="c">
            <div className="login" onClick={kakaoLogin}>
              <span>
                <img
                  className="kakao"
                  style={{ width: '30px' }}
                  src="./images/kakao.png"
                />
                카카오 로그인
              </span>
            </div>
            <br />
            <div className="login2" onClick={naverLogin}>
              <span>
                <img
                  className="naver"
                  style={{ width: '23px' }}
                  src="./images/naver.png"
                ></img>
                네이버 로그인
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
