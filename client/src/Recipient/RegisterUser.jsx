import '../common.css'
import Title from '../Components/Title'
import axios from 'axios'
import { useState } from 'react'

function RegisterUser() {
    // After registration, indicate whether it is successful or not and redirect to login page


    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [HouseholdSize, setHouseholdSize] = useState(0)
    const [dietaryNeeds, setDietaryNeeds] = useState('')
    const [rationCardNumber, setRationCardNumber] = useState('')
    const [pantryID, setPantryID] = useState(0)
    const [emailID, setEmailID] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    function register() {
        if (!emailID ||  !password) {
            alert('Email and password cannot be empty')
            return
        }
        if (password.length < 6) {
            alert('Password is too small')
            return
        }
        if (password !== repeatPassword) {
            alert('Password and repeat password must be the same')
            return
        }

        axios.post(`${import.meta.env.VITE_SERVER_URL}register_user`,
            {
                "phone_number": phoneNumber,
                "name": name,
                "ration_card_number": rationCardNumber,
                "email_ID": emailID,
                "dietary_needs": dietaryNeeds,
                "household_size": HouseholdSize,
                "pantry_ID": pantryID,
                "address": address,
                "password": password
            },
            { headers: { "Content-Type": 'application/json' } })
            .catch((e) => console.log(e))
            .then((response) => console.log(response))
    }

    return <div className="light-pink pb-5">
        <Title title="User Registration" />
        <div className="card mx-4 px-4">
            <input className="form-control mt-4" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
            <input className="form-control mt-3" placeholder="Phone number" onChange={(e) => setPhoneNumber(e.target.value)}></input>
            <textarea className="form-control mt-3" placeholder="Address" onChange={(e) => setAddress(e.target.value)}></textarea>
            <input className="form-control mt-3" placeholder="Household size" onChange={(e) => setHouseholdSize(e.target.value)}></input>
            <textarea className="form-control mt-3" placeholder="Families' special dietary needs" onChange={(e) => setDietaryNeeds(e.target.value)}></textarea>
            <input className="form-control mt-3" placeholder="Ration card number" onChange={(e) => setRationCardNumber(e.target.value)}></input>
            <input className="form-control mt-3" placeholder="Chosen pantry's ID" onChange={(e) => setPantryID(e.target.value)}></input>
            <input className="form-control mt-3" placeholder="Email ID" type="email" onChange={(e) => setEmailID(e.target.value)}></input>
            <input className="form-control mt-3" placeholder="Password" type='password' onChange={(e) => setPassword(e.target.value)}></input>
            <input className="form-control mt-3 mb-3" type="password" placeholder="Repeat password" onChange={(e) => setRepeatPassword(e.target.value)}></input>

            <button className='btn dark-blue-button mb-3' onClick={() => register()}>Sign Up</button>
        </div>
    </div>
}

export default RegisterUser