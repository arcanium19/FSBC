import React from 'react'
import CardNumber from './cardNumber'

const NameList = ({numbers}) => {

  return (
    <div>
        {
            numbers.map(e=>{
                const date = new Date().toDateString()
                return(
                  <CardNumber key={`${e.name}+${date}`} number={e} />
                  
                )
            })
        }
    </div>
  )
}

export default NameList