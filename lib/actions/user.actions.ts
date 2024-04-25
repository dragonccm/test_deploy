"use server"
import UserAccount from "../models/user.model";
import bcrypt from "bcryptjs";
import { ObjectId } from 'mongodb';

const createUser = async (data: any) => {
  try {
    const users = await UserAccount.findOne({ username: data.username }, { _id: 1 }).maxTimeMS(50000);
    console.log(users)

    if (users) {
      return { err: "Người dùng đã tồn tại" };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;

      const newUser = new UserAccount({
        profile_photo: data.profile_photo || 'https://i.pinimg.com/originals/76/07/5c/76075c11bfe509ee9a11d9baa991c40d.jpg',
        username: data.username,
        email: data.email,
        password: data.password,
        fullname: data.fullname,
        gender: data.gender,
        dob: data.dob,
        hometown: data.hometown,
        role: 0
      });

      await newUser.save();
      return { err: null, res: newUser };
    }
  } catch (error: any) {
    return { err: error.message };
  }
};
const checklogin = async (credentials: any) => {
  try {
    const user = await UserAccount.findOne({ username: credentials.username });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (isPasswordCorrect) {
        const newUser = {
          _id: user._id,
          image: user.profile_photo,
          name: user._id,  // đổi "username" thành "name"
          email: user.email,
          password: user.password,
          fullname: user.fullname,
          gender: user.gender,
          dob: user.dob,
          hometown: user.hometown,
          __v: user.__v
        }

        return newUser;
      };
    }

  } catch (error: any) {
    throw new Error(error);
  }
}
const getUser = async (data: any) => {

  try {
    const users = await UserAccount.findOne({ _id: data }, { _id: 0, password: 0 });
    if (users) {
      return { err: "0", data: users };
    } else {
      return { err: "1", data: "người dùng không tồn tại" }
    }
  } catch (error: any) {
    return { err: error.message };
  }
};



// update
const updateUser = async (data: any) => {
  const clientid = new ObjectId(data.sessionUser).toHexString();
  try {
    const users = await UserAccount.findOne({ _id: clientid }, { _id: 1 }).maxTimeMS(50000);
    if (users) {
      const updatedUser = await UserAccount.findOneAndUpdate(
        { _id: clientid },
        {
          username: data.username,
          profile_photo: data.profile_photo,
          email: data.email,
          fullname: data.fullname,
          gender: data.gender,
          dob: data.dob,
          hometown: data.hometown,
        },
        { new: true }
      );
      return { err: 0, tus: updatedUser };
    } else {
      return { err: 1, tus: "lỗi cập nhật" };
    }
  } catch (error: any) {
    return { err: error.message };
  }
};
const updateUserAndPass = async (data: any) => {
  if (data.newpassword.length > 6) {
    const clientid = new ObjectId(data.sessionUser).toHexString();
    try {
      const users = await UserAccount.findOne({ _id: clientid }, { _id: 1 }).maxTimeMS(50000);
      if (users) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.newpassword, salt);


        data.newpassword = hashedPassword;

        const updatedUser = await UserAccount.findOneAndUpdate(
          { _id: clientid },
          {
            username: data.username,
            profile_photo: data.profile_photo,
            email: data.email,
            password: data.newpassword,
            fullname: data.fullname,
            gender: data.gender,
            dob: data.dob,
            hometown: data.hometown,
          },
          { new: true }
        );

        return { err: 0, tus: updatedUser };
      } else {
        return { err: 1, tus: "lỗi cập nhật" };
      }
    } catch (error: any) {
      return { err: error.message };
    }
  }
  else {
    return { err: 1, tus: "mật khẩu yếu " };
  }
};


const updateRole = (data: any) => {
  const newarray = data.map((mapid: any) => new ObjectId(mapid).toHexString());

  return Promise.all(newarray.map(async (_id: any) => {
    try {
      const users = await UserAccount.findOne({ _id: _id }, { _id: 1, role:1 }).maxTimeMS(50000);
      if (users) {
  
        await UserAccount.findOneAndUpdate(
          { _id: _id },
          {
            role: users.role == 1 ? 0 : 1
          },
          { new: true }
        );
        console.log("pass",users.role == 1 ? 0 : 1)
        return { err: 0, tus:" JSON.stringify(updatedUser.role)" };
      } else {
        return { err: 1, tus: "lỗi cập nhật" };
      }
    } catch (error: any) {
      return { err: error.message };
    }
  }));
};

// check password 
const checkpass = async (data: any) => {
  try {
    const user = await UserAccount.findOne({ _id: data.sessionUser });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
      );
      console.log(isPasswordCorrect)

      if (isPasswordCorrect) {
        return { err: 0, tus: "success" };
      } else {
        return { err: 1, tus: "password not match" };
      };
    }
    else {
      return { err: 0, tus: "null user" };
    }
  } catch (error: any) {
    return { err: 1, tus: error };
  }
}


const getall = async (data: any) => {
  try {
    const user = await UserAccount.find({}, { password: 0 });
    if (user) {
      const formattedUsers = user.map((user: any) => ({
        _id: user._id.toString(),
        profile_photo: user.profile_photo,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        gender: user.gender,
        dob: user.dob.toISOString().split("T")[0].split("-").reverse().join("/"),
        hometown: user.hometown,
        role: user.role,
        __v: user.__v,
      }));
      return { err: 0, tus: formattedUsers };
    } else {
      return { err: 1, tus: "null user" };
    }
  } catch (error: any) {
    return { err: 1, tus: error };
  }
};



export {
  createUser,
  checklogin,
  getUser,
  checkpass,
  updateUserAndPass,
  updateUser,
  getall,
  updateRole
};