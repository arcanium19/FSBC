import React from 'react'
import { deleteNumber } from './actions'

const CardNumber = ({number}) => {

    const handleDelete = () =>{
        if(window.confirm(`Delete ${number.name}?`)){
            deleteNumber(number.id)
            window.location.reload()
        }
    }

    return (
        <div>
            {number.name}: {number.number}
            <button onClick={handleDelete} className='btn2'>delete</button> 
        </div>
    )
}

export default CardNumber