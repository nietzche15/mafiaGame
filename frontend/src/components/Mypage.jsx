import React from 'react'
import './styles/mypage.css';
import { Link } from "react-router-dom";
import { Box, Button, TextField } from '@mui/material';

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
                <div className='right2'>
                    <Button variant="contained" onClick={kakaoLogout} color="primary" sx={{ m: 0, '* .Mui_disabled': { background: '#E38989'} }}>
                        로그아웃
                    </Button>
                    <br /><br />
                    <Button variant="contained" color="primary" sx={{ m: 0, '* .Mui_disabled': { background: '#E38989' } }}>
                        <Link to="/mypage" style={{ textDecoration: "none", color:'white' }}>수정</Link>
                    </Button>
                    <br /><br />
                    <Button variant="contained" color="primary" sx={{ m: 0, '* .Mui_disabled': { background: '#E38989' } }}>
                        <Link to="/lobby" style={{ textDecoration: "none", color:'white' }}>나가기</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
