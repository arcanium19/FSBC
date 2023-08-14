import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_URL
const url =  `${backend}/api/persons`

export const createNumber = async contactData =>{

    try {
        const result = (await axios.post(url, contactData)).data
        return {message: result};
    } catch (error) {
        console.log(error.response.data.error)
        return {error: error.response.data.error}
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
        console.log({error: error.response.data.error})
        return {error: error.response.data.error}
    }
}

export const deleteNumber = async id =>{
    try {
        const result = (await axios.delete(`${url}/${id}`)).data
        return result
    } catch (error) {
        console.log({error: error.response.data.error})
        return {error: error.response.data.error}
    }
}

export const updateNumber = async (id, dataUpdated) =>{
    try {
        const result = await axios.put(`${url}/${id}`, dataUpdated)
        return result;
    } catch (error) {
        console.log({error: error.response.data.error})
        console.log(error)
        return {error: error.response.data.error}
    }
}
