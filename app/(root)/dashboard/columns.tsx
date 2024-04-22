"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    fullname: string
    email: string
    dob: string
    username: string
    gender: string
    hometown: string
    role: Number
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "fullname",
        header: "fullname",
    },
    {
        accessorKey: "dob",
        header: "dob",
    },
    {
        accessorKey: "username",
        header: "username",
    },
    {
        accessorKey: "hometown",
        header: "hometown",
    },
    {
        accessorKey: "gender",
        header: "gender",
    },
    {
        accessorKey: "role",
        header: "role",
    },
]
