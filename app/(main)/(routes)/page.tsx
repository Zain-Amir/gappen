import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";
 
export default function Home() {
  return (
    <div className="flex h-screen gap-10 justify-center items-center">
       <UserButton afterSignOutUrl="/"/>
      <ModeToggle></ModeToggle>
    </div>
  )
}
