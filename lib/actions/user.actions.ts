"use server"
import UserAccount from "../models/user.model";
import bcrypt from "bcryptjs";
import { ObjectId } from 'mongodb';

const createUser = async (data: any) => {
  try {
    const users = await UserAccount.findOne({ username: data.username }, { _id: 1 }).maxTimeMS(50000);
    if (users) {
      return { err: "Người dùng đã tồn tại" };
    } else {

      // mã hoá mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      // thay thế mật khẩu gốc bằng mật khẩu đã mã hoá
      data.password = hashedPassword;

      const newUser = new UserAccount({
        profile_photo: data.profile_photo,
        username: data.username,
        email: data.email,
        password: data.password,
        fullname: data.fullname,
        gender: data.gender,
        dob: data.dob,
        hometown: data.hometown,
        role:0
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
  const clientid = new ObjectId(data.sessionUser).toHexString();
  try {
    const users = await UserAccount.findOne({ _id: clientid }, { _id: 1 }).maxTimeMS(50000);
    if (users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);


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
};


const updateRole = async (data: any) => {
  const clientid = new ObjectId(data._id).toHexString();
  try {
    const users = await UserAccount.findOne({ _id: clientid }, { _id: 1 }).maxTimeMS(50000);
    if (users) {
      const updatedUser = await UserAccount.findOneAndUpdate(
        { _id: data },
        {
          role:data.role
        },
        { new: true }
      );
      console.log(updatedUser)
      return { err: 0, tus: updatedUser };
    } else {
      return { err: 1, tus: "lỗi cập nhật" };
    }
  } catch (error: any) {
    return { err: error.message };
  }
};

// check password 
const checkpass = async (data: any) => {
  try {
    const user = await UserAccount.findOne({ username: data.sessionUser });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
      );
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