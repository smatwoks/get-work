import Logo from "@/public/logo.png";
import Link from "next/link";
import Image  from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
    const session = await auth();



    return (
        <nav className="flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo Get Work" width={40} height={40}/>
        <h1 className="text-2xl font-bold">
            Get<span className="text-primary">Work</span></h1>
        </Link>

        

        <div className="hidden md:flex items:center gap-5">
            <ThemeToggle />
            <Link className={buttonVariants({size:"lg"})} href="/post-job">Post Job</Link>
            {session?.user?(
                <UserDropdown email={session.user.email as string} image={session.user.image as string} name={session.user.name as string} />
            ):(
                <Link href="/login" className={buttonVariants({variant:"outline",size:"lg"})}>

                </Link>
            )}
        </div>

    </nav>
    );
       

    
}