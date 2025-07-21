
const validator=require("validator")

const userValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("enter a valid name");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("enter a vlid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("enter a Strong password");
  }
};





const updateValidation= (req)=>
{
  const allowedUpdate=["firstName", "lastName", "password"]

  const isUpdateAllow = Object.keys(req.body).every((key) =>{
    allowedUpdate.includes(key)
  }) 

  return isUpdateAllow

}

module.exports={
    userValidation,
    updateValidation
}