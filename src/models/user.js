import { Schema, model, mongoose } from 'mongoose'

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  roles: [String]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

module.exports = mongoose.models.User || model("User", userSchema)
