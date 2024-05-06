"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
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
import { Loader2 } from "lucide-react";



const FormSchema = z.object({
    fullname: z.string().nonempty("không được để trống trường này "),
})


const Page = () => {
    const [loading, setloading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
    const { data: session, status: sessionStatus } = useSession();


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })
            if (res.status === 400) {
                toast({
                    title: "Lỗi Đăng Ký Hãy Nhập Lại",
                    description: "Kiểm Tra lại Thông Tin Và Đăng Ký",
                })
                setloading(false)
            } else if (res.status === 200) {
                toast({
                    title: "Đã Tạo Tài Khoản",
                    description: "Bạn Dẫ Đăng Ký Thành Công TÀi Khoản",
                })

                router.push("/login")
            }
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <main className='mx-auto flex max-w-5xl w-3/4 flex-col justify-center px-10 py-20 '>
            <h1 className='head-text'>Đăng Ký</h1>


            <section className='mt-9 bg-dark-2 p-10 rounded-md'>
                <Form  {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center gap-10'>
                        {/* Full name field */}
                        <FormField control={form.control} name="fullname" render={({ field }) => (
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
                        )} />


                        {/* Submit button */}
                        {loading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>) : (<Button type="submit" className="hover:bg-zinc-700">Submit</Button>)}

                        <FormDescription>
                            Bạn Đã Có Tài Khoản
                            <Link href={`/login`} className='w-fit'>
                                <span className="text-cyan-400 hover:text-cyan-700"> Đăng Nhập </span>
                            </Link>
                        </FormDescription>
                    </form>
                </Form>
            </section>
        </main>
    )
}
export default Page;
