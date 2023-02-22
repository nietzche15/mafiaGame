import React, { useEffect, useState } from 'react'
import '../../components/styles/mypage.css';
import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Cookies } from 'react-cookie';

export default function Mypage() {
    const cookies = new Cookies()
    console.log(cookies.get('id1'))
    console.log(cookies.get('id2'))
    console.log(cookies.get('id3'))
    const [email, setEmail] = useState(cookies.get('id1'))
    const [img, setImg] = useState(cookies.get('id2'))
    const [name, setName] = useState(cookies.get('id3'))
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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
                        <td style={{ width: '170px', textAlign: 'center' }} rowSpan="2" ><img alt='img' style={{ width: '100%', borderRadius: '10px' }}
                            src={
                                img === 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg' ? './images/mafiaImg.png' : img}
                        />{name}</td>
                        <td style={{ height: '100px' }} >{email}</td>
                    </tr>
                    <tr>
                        <td style={{ height: '100px' }}>점수</td>
                    </tr>
                    <tr>
                        <td colSpan="2">승률</td>
                    </tr>
                </table>
                <div className='right2'>
                    <Button variant="contained" onClick={{ kakaoLogout }} color="primary" sx={{ m: 0, '* .Mui_disabled': { background: '#E38989' } }}>
                        로그아웃
                    </Button>
                    <br /><br />
                    <Button variant="contained" onClick={handleOpen} color="primary" sx={{ m: 0, '* .Mui_disabled': { background: '#E38989' } }}>
                        <Link to="/mypage" style={{ textDecoration: "none", color: 'white' }}>수정</Link>
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style2}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                프로필 사진 변경
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                                ss
                            </Typography>
                        </Box>
                    </Modal>
                    <br /><br />
                    <Button variant="contained" color="primary" sx={{ m: 0, '* .Mui_disabled': { background: '#E38989' } }}>
                        <Link to="/lobby" style={{ textDecoration: "none", color: 'white' }}>나가기</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}