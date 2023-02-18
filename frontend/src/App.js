import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import Main from './components/Main';
import Kakao from './components/Kakao';
import Profile from './components/Profile';
import Notfound from './components/Notfound';
import Lobby from './components/Lobby';
import DMText from './components/DMText';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/kakao" element={<Kakao />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/gamepage" element={<GamePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
