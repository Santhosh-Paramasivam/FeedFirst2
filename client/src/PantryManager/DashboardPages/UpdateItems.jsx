import { useEffect, useState } from 'react'
import '../../common.css'
import Subtitle from '../../Components/Subtitle'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UpdateItems() {
    let navigate = useNavigate()

    const [itemName, setItemName] = useState('')
    const [itemUnit, setItemUnit] = useState('')

    const [currentItems, setCurrentItems] = useState([])

    function getItems() {
        if(!localStorage.getItem('access_token')) {
            alert('Session expired, please log in again')
            navigate({pathname:'/login'})
            return
        }

        axios.get(`${import.meta.env.VITE_SERVER_URL}items`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .catch(e => {
            console.log(e)
            alert('An error has occurred')
            return
        })
        .then((response) => {
            console.log(response)
            setCurrentItems(response.data)
        })
    }

    useEffect(() => {
        getItems()
    }, [localStorage.getItem('access_token')])

    function addItem() {
        if (!itemName.trim()) {
            alert('item name must not be empty')
            return
        }

        if (itemUnit == 'units') {
            alert('Select a valid unit')
            return
        }

        axios.post(`${import.meta.env.VITE_SERVER_URL}items`, {
            "item_name": itemName,
            "item_unit": itemUnit,
            "access_token": localStorage.getItem('access_token')
        }, {
            headers: { "Content-Type": "application/json" }
        })
            .catch(e => console.log(e))
            .then(e => {
                console.log(e)
                alert('Item successfully added')
            })
    }

    return <div className='full-height w-100 px-3 py-1' style={{ backgroundColor: 'white' }}>

        <Subtitle title='Add Items' />
        <input className='form-control mt-3' placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <select className='form-select mt-2' value={itemUnit} onChange={(e) => setItemUnit(e.currentTarget.value)}>
            <option value='unit' disabled selected>unit</option>

            <option value='c/cans'>'c/cans'</option>
            <option value='g/grams'>'g/grams'</option>
            <option value='kg/kilograms'>'kg/kilograms'</option>
            <option value='p/packets'>'p/packets</option>
        </select>
        <button className='mt-3 btn dark-blue-button mb-3' onClick={addItem}>Add Item</button>

        <Subtitle title='View Items' />
        <ul className='list-group'>
            {currentItems && currentItems.map((item) => {
                return <li key={item.item_ID} className='list-group-item'>{item.item_name}</li>
            })}
        </ul>
    </div>
}

export default UpdateItems