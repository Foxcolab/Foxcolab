import Link from "next/link";
import { ModeToggle } from "./(pages)/components/mode-toggle/Toggle";


export default function Home() {
  return (
    <>

    <div className="m-5 gap-5">
    <Link href={'/login'} className="px-6 py-2 bg-green-500 rounded-md  font-medium text-white mr-4">Login</Link>
   <Link href={'/register'} className="px-6 py-2 bg-yellow-500 rounded-md  font-medium text-white">Register</Link>
    <button className="px-6 py-2"><ModeToggle/></button>
    
    </div>

    </>
  )
}