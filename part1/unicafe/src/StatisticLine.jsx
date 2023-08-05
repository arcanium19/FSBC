import React from 'react'

const StatisticLine = ({text, value}) => {

    return (
        <tr>
            <td>
                {text} 
            </td>
            <td>
                {value}{text === 'Positive' ? '%' : null}
            </td>
        </tr>
    )
}

export default StatisticLine