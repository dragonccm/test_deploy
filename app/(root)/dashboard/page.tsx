import { getall,getUser } from "@/lib/actions/user.actions"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

async function getData(): Promise<Payment[]> {
    const session = await getServerSession();
    const data = await getUser(session?.user?.name)
    if (data.data.role==0){
        redirect(`/profile/${session?.user?.name}`);
    }
    // Fetch data from your API here.
    const u = await getall();
    return u.tus
}

export default async function DemoPage() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
