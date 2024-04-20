"use server"
import UserAccount from "../models/user.model";
import bcrypt from "bcryptjs";


const createUser = async (data: any) => {
  try {
    const users = await UserAccount.findOne({ username: data.username }, { _id: 1 });
    if (users) {
      return { err: "Người dùng đã tồn tại" };
    } else {

      // mã hoá mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      // thay thế mật khẩu gốc bằng mật khẩu đã mã hoá
      data.password = hashedPassword;

      const newUser = new UserAccount(data);
      await newUser.save();
      return { err: null, res: newUser };
    }
  } catch (error: any) {
    return { err: error.message };
  }
};
const checklogin = async (credentials: any) => {
  try {
    console.log("hfghfgh")
    const user = await UserAccount.findOne({ username: credentials.username });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (isPasswordCorrect) {
        return user;
      };
    }

  } catch (error: any) {
    throw new Error(error);
  }
}


const getUser = async (data: any) => {
  try {
    const users = await UserAccount.findOne({ email: data.email }, { _id: 0 });
    if (users) {
      return {err:"1",data:users};
    } else {
      return {err:"0",data:"người dùng không tồn tại"}
    }
  } catch (error: any) {
    return { err: error.message };
  }
};

export {
  createUser,
  checklogin,
  getUser
};