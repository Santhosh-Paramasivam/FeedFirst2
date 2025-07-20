import Subtitle from "../../Components/Subtitle"
import UserInfoRow from '../../Components/UserInfoRow'
import { useEffect, useState } from "react"
import axios from 'axios'

function VerifyUsers() {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [rationCardNumber, setRationCardNumber] = useState('')
    const [dietaryNeeds, setDietaryNeeds] = useState('')
    const [householdSize, setHouseholdSize] = useState(0)

    const [priority, setPriority] = useState('1')

    const [users, setUsers] = useState([])

    const [currentIndex, setCurrentIndex] = useState(1)

    function getUsers() {
        axios.get(`${import.meta.env.VITE_SERVER_URL}users`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .catch(e => console.log(e))
            .then((response) => {
                console.log(response)
                setUsers(response.data)

                setCurrentIndex(0)
                // setUser()
            })
    }

    useEffect(() => {
        getUsers()
    }, [])

    function nextUser() {
        if (currentIndex === users.length - 1) {
            alert('All verification requests processed for now')
            setCurrentIndex(currentIndex + 1)
            return
        }

        setCurrentIndex(currentIndex + 1)
    }

    function setStatus(recipient_ID, status) {
        axios.put(`${import.meta.env.VITE_SERVER_URL}user_status`, {
            "recipient_ID": recipient_ID,
            "status": status,
            "priority": priority
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .catch(e => console.log(e))
            .then(response => {
                console.log(response)
                nextUser()
            })
    }

    return <div className='w-100 d-flex flex-column px-3 py-2' style={{ backgroundColor: 'white' }}>
        <div className="card px-4 py-3 text-align-right">
            {currentIndex === users.length ? <h4>No requests for now</h4> : <><UserInfoRow label='Name : ' value={users.length ? users[currentIndex].name : ''} />
                <UserInfoRow label='Phone Number : ' value={users.length ? users[currentIndex].phone_number : ''} />
                <UserInfoRow label='Ration Card Number : ' value={users.length ? users[currentIndex].ration_card_number : ''} />
                <UserInfoRow label='Special Dietary Needs : ' value={users.length ? users[currentIndex].dietary_needs : ''} />
                <UserInfoRow label='Household Size : ' value={users.length ? users[currentIndex].household_size : ''} />

                <p className="form-label">Priority</p>
                <select className="form-select" onChange={(e) => { setPriority(e.currentTarget.value) }} value={priority}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>

                <div className="d-flex flex-row justify-content-end mt-3">
                    <button className='btn btn-danger mx-2' onClick={users.length ? () => setStatus(users[currentIndex].recipient_ID, "REJECTED") : () => { }}>Reject</button>
                    <button className='btn btn-success' onClick={users.length ? () => setStatus(users[currentIndex].recipient_ID, "VERIFIED") : () => { }}>Accept</button>
                </div>
            </>
            }
        </div>

        <div className="flex-grow-1"></div>
        <Subtitle className='' title={`Users to verify : ${users.length === currentIndex ? '0' : currentIndex + 1} / ${users.length === currentIndex ? '0' : users.length}`} />
    </div>
}

export default VerifyUsers