import React from 'react'
import StatisticLine from './StatisticLine'

const Display = ({bad, neutral, good, average, promedioGood, total}) => {

    if(total===0){
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    

    return (    
            <div>
                <table>
                    <tbody>
                        <StatisticLine text='Good' value={good} />
                        <StatisticLine text='Neutral' value={neutral} />
                        <StatisticLine text='Bad' value={bad} />
                        <StatisticLine text='Total' value={total} />
                        <StatisticLine text='Average' value={average} />
                        <StatisticLine text='Positive' value={total === 0 ? 0 : promedioGood} />
                    </tbody>
                </table>
                
            </div>
  )
}

export default Display