import React from 'react';
import GlobalStyle from '../../components/common/GlobalStyle';
import Rules from '../../components/main/Rules';
import '../../components/styles/main.css';

export default function Main() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=openid,profile_image,account_email,profile_nickname`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const naverApiUrl =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
    '27NfAweZlVIdEWFecF3p' +
    '&redirect_uri=' +
    'http://localhost:3000/naver' +
    '&state=' +
    '1234';

  const naverLogin = () => {
    window.location.href = naverApiUrl;
  };

  return (
    <>
      <GlobalStyle />
      <div className="back">
        <div className="wrapper">
          <div className="a">
            <div className='a1'>
              <img src="./images/main.png" alt='img' style={{ width: '75%' }} />
            </div>
            <div className="a2">
              <div role="presentation" className="login" onClick={kakaoLogin} style={{marginBottom:'10px'}}>
                <span><img className="kakao" style={{ width: '30px' }} src="./images/kakao.png" alt='img'/>카카오 로그인</span>
              </div>
              <div role="presentation" className="login2" onClick={naverLogin}>
                <span><img className="naver" style={{ width: '23px' }} src="./images/naver.png" alt='img' />네이버 로그인</span>
              </div>
            </div>
          </div>
          <div className="b">
            <Rules />
          </div>
        </div>
      </div>
    </>
  );
}
