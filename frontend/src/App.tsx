
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Update from './pages/Update';
import Profile from './pages/Profile';

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/update' element={<Update/>}/>
          <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
