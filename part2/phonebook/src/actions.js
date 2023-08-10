import axios from 'axios';
const url =  `http://localhost:3001/persons`

export const createNumber = async contactData =>{

    try {
        const result = (await axios.post(url, contactData)).data
        return result;
    } catch (error) {
        console.log({error: error.message})
    }
    
}

export const getAllNumber = async ()=>{
    try {
        const result = (await axios.get(url)).data
        return result
    } catch (error) {
        console.log({error: error.message})
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
