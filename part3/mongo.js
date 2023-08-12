const mongoose = require('mongoose')


const PASSWORD_DB = process.argv[2]

const uri = `mongodb+srv://unicomparteargentina:${PASSWORD_DB}@phonebookdb.vop569c.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri)

const numberSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Number = mongoose.model('Number', numberSchema);

if(process.argv[3] && process.argv[4]){
    const name = process.argv[3]
    const number = process.argv[4]

    if(!name || !number){
        if(!name) console.log('Error: Please add a name.')
        if(!number) console.log('Error: Please add a valid number.')
    }else{
        const addNewOne = new Number({
            name,
            number
        })
    
        addNewOne.save().then(result =>{
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        }).catch(error=>{
            console.log(`Can not be added.`)
            console.log(error.message)
        })
    }
    
}else{
    Number.find({}).then(result =>{
        console.log('Phonebook:')
        if(result.length > 0){
            result.forEach(contact =>{
                console.log(`${contact.name} ${contact.number}`)
            })
        }else{
            console.log(`It'sEmpty.`)
        }
        mongoose.connection.close()
    }).catch(error =>{
        
        console.log(error.message)
    })
}


