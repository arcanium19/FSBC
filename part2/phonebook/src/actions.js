import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_URL
const url =  `${backend}/api/persons`

export const createNumber = async contactData =>{

    try {
        const result = (await axios.post(url, contactData)).data
        return result;
    } catch (error) {
        console.log({error: error.message})
        return `error: please try againg`
    }
    
}

export const getAllNumber = async ()=>{
    try {
        const result = (await axios.get(url)).data
        if(result){
            return result
        }else{
            return []
        }
    } catch (error) {
        console.log({error: error.message})
        return []
    }
}

export const deleteNumber = async id =>{
    try {
        const result = (await axios.delete(`${url}/${id}`)).data
        return result
    } catch (error) {
        console.log({error: error.message})
    }
}

export const updateNumber = async (id, dataUpdated) =>{
    try {
        await axios.put(`${url}/${id}`, dataUpdated)
        return `updated succefully`;
    } catch (error) {
        console.log('Error: -',`error: ${error.message}`)
        return `error`
    }
}
