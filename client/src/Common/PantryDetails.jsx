import '../common.css'
import Title from '../Components/Title'
import Subtitle from '../Components/Subtitle'
import PantryRow from '../Components/PantryRow'
import axios from 'axios'
import { useEffect,useState } from 'react'

function PantryDetails() {
    const [pantries, setPantries] = useState([])
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}pantries`)
        .then((res) => {
            console.log(res)
            setPantries(res.data)
        })
    },[])

    return <div className="light-pink" style={{ height: 'calc(100vh - 56px)' }}>
        <Title title="Pantry Details" />
        <div className="card mx-4 px-4">
            <div className='row'>
                <div className='col-2'>
                    <Subtitle title='ID' />
                </div>
                <div className='col-3'>
                    <Subtitle title='Name' />
                </div>
                <div className='col-2'>
                    <Subtitle title='Contact Number' />
                </div>
                <div className='col-5'>
                    <Subtitle title='Address' />
                </div>
            </div>

            {pantries.map((pantry) => {
                return <PantryRow key={pantry.pantry_ID} id={pantry.pantry_ID} number={pantry.contact_number} name={pantry.pantry_name} address={pantry.pantry_address}/>
            })}
        </div>
    </div>
}

export default PantryDetails