import { Routes, Route, Link } from 'react-router-dom';
import GamePage from "./pages/GamePage";
import Main from "./components/Main"
import Kakao from './components/Kakao';
import Profile from './components/Profile';
import Notfound from "./components/Notfound";
import Lobby from './components/Lobby';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/gamepage" element={<GamePage />} />
                <Route path='/kakao' element={<Kakao />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/lobby' element={<Lobby />} />
                <Route path='/*' element={<Notfound />} />
            </Routes>
        </>
    );
}