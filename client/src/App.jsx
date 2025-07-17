import Login from './Common/Login'
import Navbar from './Common/Navbar'
import Register from './Recipient/RegisterUser'
import PantryDetails from './Common/PantryDetails'
import Dashboard from './Recipient/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterUser from './Recipient/RegisterUser'
import Home from './Common/Home'
import RegisterPantry from './PantryManager/RegisterPantry'
import RegisterAdmin from './PantryManager/RegisterAdmin'

function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register_user' element={<RegisterUser />}></Route>
      <Route path='/pantries' element={<PantryDetails/>}></Route>
      <Route path='/register_pantry' element={<RegisterPantry/>}></Route>
      <Route path='/register_admin' element={<RegisterAdmin/>}></Route>
    </Routes>
  </BrowserRouter>
}

export default App
