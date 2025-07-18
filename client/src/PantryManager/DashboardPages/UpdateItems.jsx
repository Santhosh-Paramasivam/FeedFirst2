import { useState } from 'react'
import '../../common.css'
import Subtitle from '../../Components/Subtitle'

function UpdateItems() {
    const [itemName, setItemName] = useState('')
    const [itemUnit, setItemUnit] = useState('')

    function check() {
        console.log(itemName)
        console.log(itemUnit)
    }
 
    return <div className='full-height w-100 px-3 py-1' style={{ backgroundColor: 'white' }}>

        <Subtitle title='Add Items' />
        <input className='form-control mt-3' placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)}  />
        <select className='form-select mt-2' value={itemUnit} onChange={(e) => setItemUnit(e.currentTarget.value)}>
            <option value='unit' disabled selected>unit</option>

            <option value='c/cans'>'c/cans'</option>
            <option value='g/grams'>'g/grams'</option>
            <option value='kg/kilograms'>'kg/kilograms'</option>
            <option value='p/packets'>'p/packets</option>
        </select>
        <button className='mt-3 btn dark-blue-button' onClick={check}>Add Item</button>
    </div>
}

export default UpdateItems