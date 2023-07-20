import { Button } from "@/components/ui/button";
import { UserButton } from '@clerk/nextjs';

const DashboardPage = () => {
  return (
    <>
      <h1 className="text-3xl">Dashboard Page (Protected)</h1>
      <UserButton afterSignOutUrl="/" />
    </>
  )
}

export default DashboardPage;