

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
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const FormSchema = z.object({
  profile_photo: z.string(),
  username: z.string().min(2, "Username must be at least 2 characters"),
  // password: z.optional(z.string()),
  // newpassword: z.optional(z.string()),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  confirm: z.optional(z.string()),
  fullname: z.string().nonempty("không được để trống trường này "),
  gender: z.string().nonempty("không được để trống trường này "),
  hometown: z.string().nonempty("không được để trống trường này "),
  email: z.string().email("Địa chỉ email không hợp lệ").nonempty("Địa chỉ email là bắt buộc"),
})
// .refine((data) => data.newpassword === data.confirm, {
//   message: "Passwords don't match",
//   path: ["confirm"],
// })
interface Props {
  session: {
    user: {
      name: Object,
      email: string,
      image: string
    }
  },
  profile_photo: string,
  username: string,
  password: string,
  fullname: string,
  gender: string,
  dob: Date,
  hometown: string,
  email: string,
}


const AccountProfile = ({
  session,
  profile_photo,
  username,
  // password,
  fullname,
  gender,
  dob,
  hometown,
  email,
}: Props) => {
  const [loading, setloading] = useState(false)
  const router = useRouter();
  const { toast } = useToast()
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profile_photo: profile_photo,
      username: username,
      // password: password,
      fullname: fullname,
      email: email,
      gender: gender,
      dob: dob,
      hometown: hometown,
    },
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setloading(true)
    const blob = data.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].fileUrl) {
        data.profile_photo = imgRes[0].fileUrl;
      }
    }
    const update = {
      profile_photo: data.profile_photo,
      username: data.username,
      // password: data.password,
      // newpassword: data.newpassword,
      fullname: data.fullname,
      email: data.email,
      gender: data.gender,
      dob: data.dob ? data.dob : dob,
      hometown: data.hometown,
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

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <main className='mx-auto flex max-w-5xl w-3/4 flex-col justify-center px-10 py-20 '>
      <h1 className='head-text'>Đổi Thông Tin</h1>
      <section className='mt-9 bg-dark-2 p-10 rounded-md'>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center gap-10'>
            {/* Username field */}
            <FormField
              control={form.control}
              name='profile_photo'
              render={({ field }) => (
                <FormItem className='flex items-center gap-4'>
                  <FormLabel className='account-form_image-label'>
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt='profile_icon'
                        width={96}
                        height={96}
                        priority
                        className='rounded-full object-contain'
                      />
                    ) : (
                      <Image
                        src='/assets/profile.svg'
                        alt='profile_icon'
                        width={24}
                        height={24}
                        className='object-contain'
                      />
                    )}
                  </FormLabel>
                  <FormControl className='flex-1 text-base-semibold text-gray-200'>
                    <Input
                      type='file'
                      accept='image/*'
                      placeholder='Add profile photo'
                      className='account-form_image-input'
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
            {/* <FormField control={form.control} name="password" render={({ field }) => (
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
            )} /> */}

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
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className='text-base-semibold text-light-2'>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default AccountProfile;
