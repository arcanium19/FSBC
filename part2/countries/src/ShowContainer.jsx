import React, {useState} from 'react'
import CountryCard from './CountryCard';

const ShowContainer = ({country}) => {
    
    const [show, setShow] = useState(false);

    const handleShow = ()=>{
        if(show) setShow(false);
        else{
            setShow(true)
        }
    }



    return (
        <div key={`${country.name.common}-container`}>
            
                {country.name.common}

             <button onClick={handleShow}>show</button>
            {show ? (
                    <div key={`${country.name.common}-div-show`}>
                        <CountryCard name={country.name.common}
                            flag={country.flags.png} 
                            capital={country.capital} 
                            languages={country.languages} 
                            population={country.population}
                        />
                    </div>
                ) : null
                            
            }
        </div>
    )
}

export default ShowContainer