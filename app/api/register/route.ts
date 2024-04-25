import { request } from "http"
import {createUser} from "../../../lib/actions/user.actions"
import { NextResponse } from "next/server"
export const POST = async (request: any) => {
    const resData = await request.json()
    try {
        const userRes = await createUser(resData)
        if(userRes){
            if(userRes.err){
                return new NextResponse("Tạo Tài Khoản Thất Bịa",{status: 400})
            }else{
                return new NextResponse("Tạo Tài Khoản Thanh COng",{status: 200})
            }
        }else{

            return new NextResponse("lỗi Kết Nối Máy Chủ",{status: 400})
        }
    } catch (error) {
        console.log(error)
    }

}