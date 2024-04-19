"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
// import { useToast } from "@/components/ui/use-toast"
// Comprehensive registration form schema
const FormSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  confirm: z.string().nonempty("không được để trống trường này "),
  fullname: z.string().nonempty("không được để trống trường này "),
  gender: z.string().nonempty("không được để trống trường này "),
  dob: z.string().nonempty("không được để trống trường này "),
  hometown: z.string().nonempty("không được để trống trường này "),
  email: z.string().email("Địa chỉ email không hợp lệ").nonempty("Địa chỉ email là bắt buộc"),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
})


const Page = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      gender: "",
      dob: "",
      hometown: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    try{
      const res = await fetch("api/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(data),
      })
      if(res.status === 400){
        alert(res.status)
      } else if(res.status ===200) {
        alert(res.status)

        router.push("/login")
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <main className='mx-auto flex max-w-5xl w-2/4 flex-col justify-center px-10 py-20 '>
      <h1 className='head-text'>Đăng Ký</h1>


      <section className='mt-9 bg-dark-2 p-10 rounded-md'>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center gap-10'>
            {/* Username field */}
            <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Password field */}
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" {...field} />
                </FormControl>
                <FormDescription>Choose a strong password that meets the requirements.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirm" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm password" {...field} />
                </FormControl>
                <FormDescription>Please enter your password again.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Full name field */}
            <FormField control={form.control} name="fullname" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            {/* Full name field */}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Gender field (replace with appropriate component for gender selection) */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base-semibold text-light-2'>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nam">nam</SelectItem>
                      <SelectItem value="nu">nu</SelectItem>
                      <SelectItem value="khac">khac</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select Gender
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of birth field */}
            <FormField control={form.control} name="dob" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Select date of birth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Hometown field */}
            <FormField control={form.control} name="hometown" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Hometown</FormLabel>
                <FormControl>
                  {/* Replace with your implementation for hometown input (e.g., Input, Select) */}
                  <Input placeholder="Enter your hometown" {...field} />
                </FormControl>
                <FormDescription>Your place of origin.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Submit button */}
            <Button type="submit" className="">Submit</Button>
          </form>
        </Form>
      </section>
    </main>
  )
}
export default Page;
