const { User , Spec} = require("../models"); 
const bcrypt = require("bcrypt");
const jwt =  require('jsonwebtoken');
const user = require("../models/user");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
  return jwt.sign({ id },'birehClincJWT' , {
    expiresIn: maxAge
  })
}

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, password , role, spe_type } = req.body;
    const existingUser = await User.findOne({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create user
    const excitedSpec = await Spec.findOne({
      where : { spe_type }
    });
    if (!excitedSpec) {
      return res.status(400).json({ message: "Specialization not found" });
    }
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password,
      role: role || "user",
      specializtion_idspecializtion: excitedSpec.idspecializtion,
    });
    const token = createToken(newUser.iduser);
    res.cookie('jwt', token , {httpOnly: true, maxAge : maxAge*1000})
    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.iduser,
    });
  }catch (error) {
    console.error("Signup error:", error);

  if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    const validationMessages = error.errors.map((e) => e.message);
    return res.status(400).json({ message: validationMessages });
  }

  return res.status(500).json({
    message: "Server error",
    error: typeof error.message === "string" ? error.message : JSON.stringify(error)
  });
}
};


// Login user 
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    if (!user.is_active){
      return res.status(404).json({ 
        message: "User cannot signin"
      });
    }
    const token = createToken(user.iduser);
    res.cookie('jwt', token , {httpOnly: true, maxAge : maxAge*1000})
    return res.status(201).json({
      message: "Signin succesfully ! , Welcome " + user.first_name ,
      user : user
    });
  } catch (error) {
    return res.status(500).json({
      error: typeof error.message === "string" ? error.message : JSON.stringify(error) 
    });
  }
};

// Update user

exports.update = async (req,res) => {
  // make sure that the updates is only made by admin
  /*
    ADD HERE !
  */
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    /*
    UPDATE USER METHOD!!
    */
    }catch{
      console.error("Update error:", error);
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        const validationMessages = error.errors.map((e) => e.message);
        return res.status(400).json({ message: validationMessages });
      }
    
      return res.status(500).json({
        message: "Server error",
        error: typeof error.message === "string" ? error.message : JSON.stringify(error)
      });
      }

}

// Delete (Soft delete) user 


// SIGNOUT

// get all users

// find by id

// get all active users

// get all un-active users

// get users by specllizaton 

