

"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { objectInputType, z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
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
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const FormSchema = z.object({
  password: z.optional(z.string()),
  newpassword: z.optional(z.string()),
  confirm: z.optional(z.string()),
})
.refine((data) => data.newpassword === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
})
interface Props {
  session: {
    user: {
      name: Object,
      email: string,
      image: string
    }
  },
  password: string,

}


const Changepass = ({
  session,
  password,
}: Props) => {
  const [loading, setloading] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: password,
    },
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setloading(true)
    const update = { 
      password: data.password,
      newpassword: data.newpassword,  
      sessionUser: session?.user?.name 
    }
    try {
      const res = await fetch("/api/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(update),
      })
        .then((response: any) => {
          if (response.status == 200) {
            toast({
              title: "cập nhật thành công ",
            }),
              setloading(false)
          } else {
            toast({
              title: "Lỗi Cập Nhật",
            }),
              setloading(false)
          }
        })
        .then((data) => {
          console.log("trong kia", data);
          setloading(false)
        })
        .catch((error) => {
          console.log(error);
          setloading(false)
        });
    } catch (err) {
      console.log(err);
      setloading(false)
    }
  }

  return (
    <main className='mx-auto flex max-w-5xl w-3/4 flex-col justify-center px-10 py-20 '>
      <h1 className='head-text'>Đổi Mật Khẩu</h1>
      <section className='mt-9 bg-dark-2 p-10 rounded-md'>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center gap-10'>
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
            <FormField control={form.control} name="newpassword" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>New Password</FormLabel>
                <FormControl>
                  <Input type="newpassword" placeholder="Enter password" {...field} />
                </FormControl>
                <FormDescription>Choose a strong password that meets the requirements.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirm" render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base-semibold text-light-2'>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="newpassword" placeholder="Confirm password" {...field} />
                </FormControl>
                <FormDescription>Please enter your password again.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

          

            {/* Submit button */}
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>) : (<Button type="submit" className="hover:bg-zinc-700">Submit</Button>)}
            <FormDescription>
              Bạn Đã Có Tài Khoản
            </FormDescription>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default Changepass;
