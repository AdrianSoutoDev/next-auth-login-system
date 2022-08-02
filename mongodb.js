import { mongoose } from 'mongoose'

const connectMongo = async () => { 
  // añadir +srv para auenticacion con user y pasword
  const connectionString = process.env.MONGO_DB_URI

  // añadir opciones
  // conexión a mongodb
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
     console.error(err)
  })

  process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
  })
}

export default connectMongo;
