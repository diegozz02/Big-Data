import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './screens/Login';
import Home from './screens/Home';
import STemp from './screens/STemp';
import Shell from './components/Shell';
import { Axios as axios } from "axios";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/' element={<Login/>} />
          <Route path='/*'element={<Shell> <Route path='/home' element={<Home/>} /> {} </Shell>}/>
          {/* <Shell path='/home' element={<Home/>} /> */}
          <Route path='/home' element={<Home/>} />
          <Route path='/STemp' element={<STemp/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
