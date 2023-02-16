import React, { useEffect } from "react";
import axios from 'axios';

export default function Kakao() {
    useEffect(async () => {
        const code = new URL(window.location.href).searchParams.get("code");
        let grant_type = "authorization_code";
        let client_id = "ec651559127139e56f9dc2e455e69667";
        let redirect = 'http://localhost:3000/kakao';
        const res = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect}&code=${code}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        const res2 = await axios.get("https://kapi.kakao.com/v2/user/me",
            {
                headers: {
                    'Authorization': `Bearer ${res.data.access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
        console.log(res2.data.kakao_account.email)
    }, [])
    // const a = await axios.post();
    // const b = await axios.post(a);

    const API = 'ec651559127139e56f9dc2e455e69667';
    const logout = 'http://localhost:3000';

    function kakaoLogout() {
        location.href = `https://kauth.kakao.com/oauth/logout?client_id=${API}&logout_redirect_uri=${logout}`
    }

    return (
        <div>카카오로그인
            <button onClick={kakaoLogout}>로그아웃</button>
        </div>

    )
}
