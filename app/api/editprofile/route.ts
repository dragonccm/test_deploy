import { request } from "http"
import { checkpass, updateUserAndPass, updateUser } from "../../../lib/actions/user.actions"

import { NextResponse } from "next/server"
export const POST = async (request: any) => {
    const resData = await request.json()
    try {
        if (resData.password) {
            const checkPass = await checkpass(resData)
            if (checkPass.err == 0) {
                const changePass = await updateUserAndPass(resData)
                if (changePass) {
                    return new NextResponse("Đã Cập Nhật", { status: 200 })
                } else if (changePass.err == 1) {
                    return new NextResponse(changePass.tus, { status: 400 })
                }
            } else {
                return new NextResponse("Hãy Nhập Đúng Mật Khấu Cũ", { status: 400 })
            }
        } else {
            const changeInfo = await updateUser(resData)
            if (changeInfo.err == 0) {
                return new NextResponse("Đã Cập Nhật", { status: 200 })
            } else if (changeInfo.err == 1) {
                return new NextResponse("lỗi cập nhật", { status: 400 })
            }
        }
        if (resData) {
            if (resData) {
                return new NextResponse("Tạo Tài Khoản Thất Bịa", { status: 200 })
            } else {
                return new NextResponse("Tạo Tài Khoản Thanh COng", { status: 200 })
            }
        } else {
            return new NextResponse("lỗi Kết Nối Máy Chủ", { status: 200 })
        }
    } catch (error: any) {
        console.log(error)
        return new NextResponse(error, { status: 200 })

    }

}