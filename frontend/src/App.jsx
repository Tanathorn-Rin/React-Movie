import { Routes, Route } from 'react-router-dom';
import Favorite from './pages/Favorite';
import './App.css'
import Home from './pages/Home';
import NavBar from './component/NavBar';

function App() {
    return (
      <div> 
            <NavBar />
        <main className="main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorite />} />
            </Routes>
        </main>
      </div>
    );
}

export default App;
