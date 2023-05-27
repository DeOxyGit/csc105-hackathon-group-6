
import Register from './components/Register'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
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

      </Routes>
    
    </BrowserRouter>
      
    
  )
}

export default App
