#  const user=await User.findOne({emailId})

# await bcrypt.compare(password, user.password)

#  const {token}=req.cookies

#    
 validate(value) {
    if (!validator.isEmail(value)) {
        throw new Error("not a valid email");
    }
},


# 
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });



# `install cookie-parcer to read cookies `


# User.findById(toUserId)

#  
 const allowedStatus=["intrested", "ignored"]

  if(!allowedStatus.includes(status)){
    res.send("invalid status")
  }