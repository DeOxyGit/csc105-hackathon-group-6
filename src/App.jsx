
import Register from './components/Register'
import LoginPage from './pages/LoginPage'
import HomePage from './components/HomePage';
import Favourite from './pages/Favourite';
import Single from './pages/Single';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';


function App() {

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Home' element={<HomePage/>}/>
        <Route path='/Fav' element={<Favourite />}/>
        <Route path='/Single/:id' element={<Single />}/>
      </Routes>
    
    </BrowserRouter>
      
    
  )
}

export default App
