
"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";

// Comprehensive registration form schema
const FormSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
})


const Page = () => {
  const { toast } = useToast()
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
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const username = data.username;
    const password = data.password

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (res?.error) {
       toast({
          title: "Lỗi Đăng Nhập",
          description: "Invalid email or password",
        })
      if (res?.url) router.replace("/dashboard");
    } else {
       toast({
          title: "Thành Công",
          description: "Bạn Đã Đăng Nhập Thành Công",
        })
    }
  }

  return (
    <main className='mx-auto flex max-w-5xl w-2/4 flex-col justify-center px-10 py-20 '>
      <h1 className='head-text'>Đăng Nhập</h1>


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
            {/* Submit button */}
            <Button type="submit" className="">Submit</Button>
            <FormDescription>
              Bạn Đã Có Tài Khoản
              <Link href={`/register`} className='w-fit'>
                <span className="text-cyan-400 hover:text-cyan-700"> Register</span>
              </Link>
            </FormDescription>
          </form>
        </Form>
      </section>
    </main>
  )
}
export default Page;

