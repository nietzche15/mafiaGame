import React from 'react'
import './styles/mypage.css';
import { Link } from "react-router-dom";

export default function Mypage() {

    return (
        <div className='mypage'>
            <div className='info'>
                <div className='img'>이미지</div>
                <div className='email'> 이메일</div>
            </div>
            <div className='right'>
                <div className='button'>수정</div><br />
                <div className='button'>회원탈퇴</div><br />
                <div className='button'>
                    <Link to='/lobby'>나가기</Link>
                </div>
            </div>
        </div>
    )
}
