import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import GamePage from './pages/GamePage';
import Main from './components/Main';
import Kakao from './components/Kakao';
import Profile from './components/Profile';
import Notfound from './components/Notfound';
import Lobby from './components/Lobby';
import Mypage from './components/Mypage';
import Naver from './components/Naver';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/gamepage" element={<GamePage />} />
        <Route path="/kakao" element={<Kakao />} />
        <Route path="/naver" element={<Naver />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/mypage" element={<Mypage />} />

        <Route path="/*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
