import mongoose from "mongoose";
import {} from "dotenv/config"

async function main() {
    try{
        await mongoose.connect(process.env.CONNECTION_URI);
    }catch(err){
        console.log(err)
    }
    
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
main()

const FormSchema  = new mongoose.Schema({
    id: String,
    age: Number 
})

export const Form = mongoose.model('Form', FormSchema )