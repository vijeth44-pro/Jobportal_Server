import mongoose from "mongoose";

const mongo_url = 'mongodb://localhost:27017/Main-Job-Server'

const mongoConnection = async() =>{
  try {
    await mongoose.connect(mongo_url)
    console.log("database connected successfully")
  } catch (error) {
    console.log("error in connecting database")
  }
}
export default mongoConnection;