import React, { useRef, useState } from "react";
import axios from "axios";
import "./styles/main.css";
export default function Main() {
    // const REST_API_KEY = 'ec651559127139e56f9dc2e455e69667';
    // const REDIRECT_URI = 'http://localhost:3000/kakao';
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

    const kakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }



    const [text, setText] = useState('첫번째 내용입니다.');
    const text1 = '첫번째 내용입니다.'
    const text2 = '두번째 내용입니다.'
    const text3 = '세번째 내용입니다.'
    const text4 = '네번째 내용입니다.'
    return (
        <div>
            <div className="outer">
                <div className='title'>
                    용산 마피아
                </div>
                <img className='rule1' onClick={() => setText(text1)} style={{ width: '17px' }} src='./images/o.png' />
                <img className='rule2' onClick={() => setText(text2)} style={{ width: '17px' }} src='./images/o.png' />
                <img className='rule3' onClick={() => setText(text3)} style={{ width: '17px' }} src='./images/o.png' />
                <img className='rule4' onClick={() => setText(text4)} style={{ width: '17px' }} src='./images/o.png' />
                <br />
                <div className='rule'>
                    {text}
                </div>
                <br />
                <div className="login" onClick={kakaoLogin}>
                    <span><img className='kakao' style={{ width: '30px' }} src='./images/kakao.png' />카카오 로그인</span>
                </div>
                <br />
                <div className="login2">
                    <span><img className='naver' style={{ width: '23px' }} src='./images/naver.png' ></img>네이버 로그인</span>
                </div>
            </div>
        </div >
    )
}