import React from 'react'
import './styles/lobby.css';
import { Link } from "react-router-dom";

export default function Lobby() {

    return (
        <div className='lobby'>
            <div className='left'>
                <div className='roomlist'>방 리스트</div>
                <div className='chatlist'>채팅창</div>
            </div>
            <div className='right'>
                <div className='button'>방 생성</div><br />
                <div className='button'>
                    <Link to='/mypage'>마이 페이지</Link></div>
            </div>
        </div >
    )
}
