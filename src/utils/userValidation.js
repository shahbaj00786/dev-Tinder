
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
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;

}

module.exports={
    userValidation,
    updateValidation
}