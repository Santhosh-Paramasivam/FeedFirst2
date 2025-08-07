import { useEffect, useState } from 'react'
import '../../common.css'
import Subtitle from '../../Components/Subtitle'
import ItemBatchRow from '../../Components/ItemBatchRow'
import axios from 'axios'

function ViewInventory() {
    const [currentItems, setCurrentItems] = useState([])

    function getItems() {
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
    }, [])

    return <div className='full-height w-100 px-4 py-1' style={{ backgroundColor: 'white' }}>
        <Subtitle title='Add an item batch'/>
        <select className='form-select mb-2'>
            {currentItems.map((item) => {
                return <option value={item.item_ID}>{item.item_name}</option>
            })}
        </select>
        <input className='form-control mb-2' placeholder='Batch No.' type='number' />
        <input className='form-control mb-2' placeholder='Quantity' type='number' />
        <input className='form-control mb-2' type='datetime-local' placeholder='Expiry Date'></input>

        <button className='btn dark-blue-button mt-2'>Add Batch</button>

        <div className='card'>
            <ItemBatchRow className='mx-2' title={true} name="Name" batch_no="Batch No." quantity="Quantity" exp_date="Exp. Date"></ItemBatchRow>            
            <ItemBatchRow name="Milk"  />
        </div>
    </div>
}

export default ViewInventory