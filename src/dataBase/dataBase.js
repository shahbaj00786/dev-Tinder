const mongoose=require("mongoose")

const userDB=async ()=>
{
    await mongoose.connect("mongodb+srv://Shahbaj:9tms4EOaHCBckf6w@cluster1.3zdvvwa.mongodb.net/PractNodeJs")
}

module.exports={userDB}