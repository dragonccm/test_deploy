import User from "../models/user.model";
import zod from "zod";

const createUser = async (data: any) => {
  const schema = zod.object({
    username: zod.string(),
    password: zod.string().min(6),
    fullname: zod.string(),
    gender: zod.string(),
    dob: zod.string(),
    hometown: zod.string(),
  });

  const validatedData = await schema.parseAsync(data);
  const user = new User(validatedData);
  await user.save();
  return user;
};

export { createUser };
