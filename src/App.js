import Login from './components/login';
import Signup from './components/signup';
import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Books from './components/Books';
import Addbook from './components/Addbook';
import BookState from './context/bookState';
import Alertstate from './context/alertstate';
import Alert from './components/Alert';
import Shelf from './components/Shelf';
import History from './components/History';
import Comics from './components/Comics';
import Fiction from './components/Fiction';
import Novel from './components/Novel';
import Biography from './components/Biography';
import Drama from './components/Drama';
import Poetry from './components/Poetry';
import Technology from './components/Technology';
import About from './components/About';
import { useState } from 'react';
import EditProfile from './components/EditProfile';

function App() {
  const [mode, setmode] = useState('light');
  const toggleMode=()=>{
    if(mode === 'light'){
      setmode('dark');
      document.body.style.backgroundColor='black';
      document.body.style.color='white';
    }
    else{
      setmode('light');
      document.body.style.backgroundColor='white';
      document.body.style.color='black';
    }
  }
  return (
    <>
      <Alertstate>
        <BookState>
          <Router>
            <Navbar mode={mode} toggleMode={toggleMode} />
            <Alert />
            <Routes>
              <Route exact path="/" element={<Home mode={mode} />}>
              </Route>
              <Route  exact path="/about" element={<About mode={mode} />}>
              </Route>
              <Route  exact path="/login" element={<Login mode={mode} />}>
              </Route>
              <Route  exact path="/signup" element={<Signup mode={mode} />}>
              </Route>
              <Route  exact path="/edit" element={<EditProfile mode={mode} />}>
              </Route>
              <Route  exact path="/adlogin" element={<Admin mode={mode} />}>
              </Route>
              <Route  exact path="/books" element={<Books mode={mode} />}>
              </Route>
              <Route  exact path="/addbook" element={<Addbook mode={mode} />}>
              </Route>
              <Route  exact path="/shelf" element={<Shelf mode={mode} />}>
              </Route>
              <Route  exact path="/history" element={<History mode={mode} />}>
              </Route>
              <Route  exact path="/technology" element={<Technology mode={mode} />}>
              </Route>
              <Route  exact path="/comics" element={<Comics mode={mode} />}>
              </Route>
              <Route  exact path="/poetry" element={<Poetry mode={mode} />}>
              </Route>
              <Route  exact path="/drama" element={<Drama mode={mode} />}>
              </Route>
              <Route  exact path="/biography" element={<Biography mode={mode} />}>
              </Route>
              <Route  exact path="/novel" element={<Novel mode={mode} />}>
              </Route>
              <Route  exact path="/fiction" element={<Fiction mode={mode} />}>
              </Route>
            </Routes>
          </Router>
        </BookState>
      </Alertstate>
    </>
  );
}

export default App;
