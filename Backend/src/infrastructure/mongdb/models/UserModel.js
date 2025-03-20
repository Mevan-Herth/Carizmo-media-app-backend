const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePicture: { type: String, default: "" },
      coverPicture: { type: String, default: "" },
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      isAdmin: { type: Boolean, default: false },
      bio:{type:String, default:"",max:69},
    },
    { timestamps: true }
  );


// Hash the password before saving 
// the best place to hash it is in the model reserch says the internet
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    } else {
        next();
    }
})

module.exports = mongoose.model('User', userSchema);