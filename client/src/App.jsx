import Login from './Common/Login'
import Navbar from './Common/Navbar'
import Register from './Recipient/Register'
import PantryDetails from './Common/PantryDetails'
import Dashboard from './Recipient/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterUser from './Recipient/Register'
import Home from './Common/Home'

function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register_user' element={<RegisterUser />}></Route>
    </Routes>
  </BrowserRouter>
}

export default App
