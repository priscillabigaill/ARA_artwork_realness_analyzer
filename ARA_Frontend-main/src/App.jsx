import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Database from './pages/database';
import Detector from './pages/detector';

function App() {

  return (
    <div>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/database" element={<Database/>} />
                <Route exact path="/detector" element={<Detector/>} />
            </Routes>
        </Router>
    </div>
  )
}

export default App
