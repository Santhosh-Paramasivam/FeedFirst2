import { useState } from "react";
import axios from 'axios'

function ItemUpdateRow({ item, className }) {
    const [stockLevel, setStockLevel] = useState(item.current_stock);

    function persistStockLevel(current_stock) {
        axios.put(`${import.meta.env.VITE_SERVER_URL}item_stock`, {
            "item_ID": item.item_ID,
            "current_stock": current_stock
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        )
        .catch(e => console.log(e))
        .then(response => {
            console.log(response)
            setStockLevel(current_stock)
        })
    }

    return <li key={item.item_ID} className={'list-group-item d-flex flex-row ' + className}>
        <div className="d-flex flex-column align-items-center justify-content-center">
            <p className='my-0 py-1'>{item.item_name}</p>
        </div>
        <select className='form-select px-2 mx-3 w-25' value={stockLevel} onChange={(e) => { persistStockLevel(e.currentTarget.value) }}>
            <option value="EMPTY">Empty</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
        </select>
        <div className='flex-grow-1'></div>
        <button className='btn btn-danger btn-sm' onClick={() => deleteItem(item.item_ID)}>Delete</button>
    </li>
}

export default ItemUpdateRow