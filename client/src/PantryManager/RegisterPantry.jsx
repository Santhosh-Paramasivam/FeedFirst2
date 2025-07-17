import '../common.css'
import Subtitle from '../Components/Subtitle'
import Title from '../Components/Title'
import axios from 'axios'
import { useState } from 'react'

function RegisterPantry() {
    const [pantryName, setPantryName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')

    const [pantryKey, setPantryKey] = useState('')

    function register() {
        axios.post(`${import.meta.env.VITE_SERVER_URL}pantries`,
            {
                'pantry_name':pantryName,
                'contact_number':contactNumber,
                'pantry_address':address
            },
            { headers: { "Content-Type": 'application/json' } })
            .catch((e) => console.log(e))
            .then((response) => {
                console.log(response)
                setPantryKey(response.data['pantry_key'])
            })
    }

    return <div className="light-pink pb-5 full-height">
        <Title title="Pantry Registration" />
        <div className="card mx-4 px-4">
            <input className="form-control mt-4" placeholder="Name" onChange={(e) => setPantryName(e.target.value)}></input>
            <input className="form-control mt-3" placeholder="Phone number" onChange={(e) => setContactNumber(e.target.value)}></input>
            <textarea className="form-control mt-3" placeholder="Address" onChange={(e) => setAddress(e.target.value)}></textarea>

            <h4 className='form-text fs-5 px-3 py-3'>Upon registration, you will receive the pantry key, copy it and keep it safely as it will be used for further registration and authentication</h4>

            <button className='btn dark-blue-button mb-3 mt-3' onClick={() => register()}>Register Pantry</button>
        </div>

        {pantryKey && <div className='card mx-4 px-4 mt-3 py-2'>
            <Subtitle title="Pantry Key"></Subtitle>
            <div className='card-body'>
                <p className='card-text fs-6'>
                    {pantryKey}
                </p>
                <button className='btn dark-blue-button'>Register as Admin</button>
            </div>
        </div>}
    </div>
}

export default RegisterPantry