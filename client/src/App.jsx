import Login from './Common/Login'
import Navbar from './Common/Navbar'
import Register from './Recipient/RegisterUser'
import PantryDetails from './Common/PantryDetails'
import Dashboard from './Recipient/UserDashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterUser from './Recipient/RegisterUser'
import Home from './Common/Home'
import RegisterPantry from './PantryManager/RegisterPantry'
import RegisterAdmin from './PantryManager/RegisterAdmin'
import AdminDashboard from './PantryManager/AdminDashboard'
import UserDashboard from './Recipient/UserDashboard'

function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register_user' element={<RegisterUser />} />
      <Route path='/pantries' element={<PantryDetails />} />
      <Route path='/register_pantry' element={<RegisterPantry />} />
      <Route path='/register_admin' element={<RegisterAdmin />} />
      <Route path='/login' element={<Login />} />

      {/* These are for testing only */}
      <Route path='/user_dashboard' element={<UserDashboard />} />
      <Route path='/admin_dashboard' element={<AdminDashboard />}></Route>
    </Routes>
  </BrowserRouter>
}

export default App
