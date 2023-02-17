import React from 'react'
import './styles/mypage.css';
import { Link } from "react-router-dom";

export default function Mypage() {

    const API = 'ec651559127139e56f9dc2e455e69667';
    const logout = 'http://localhost:3000';

    function kakaoLogout() {
        location.href = `https://kauth.kakao.com/oauth/logout?client_id=${API}&logout_redirect_uri=${logout}`
    }
    return (
        <div className='mypage'>
            <div className='info' >
                <table className='table'>
                    <tr>
                        <td style={{ width: '170px', textAlign: 'center' }} rowspan="2" ><img style={{ width: '100%' }} src='./images/mafiaImg.png' />닉네임</td>
                        <td style={{ height: '100px' }} >이메일</td>
                    </tr>
                    <tr>
                        <td style={{ height: '100px' }}>점수</td>
                    </tr>
                    <tr>
                        <td colspan="2">승률</td>
                    </tr>
                </table>
            </div>
            <div className='right'>
                <div className='button'>수정</div><br />
                <div className='button' onClick={kakaoLogout} style={{ cursor: 'pointer' }}>로그아웃</div><br />
                <div className='button'>
                    <Link to='/lobby'>나가기</Link>
                </div>
            </div>
        </div>
    )
}
