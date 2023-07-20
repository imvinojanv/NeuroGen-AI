import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <>
      <h1 className="text-3xl">Dashboard Page (Protected)</h1>
      <Button variant="destructive" size="lg">Hello there</Button>
    </>
  )
}

export default DashboardPage;