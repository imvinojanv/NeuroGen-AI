import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
    children
} : {
    children: React.ReactNode;
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPremium = await checkSubscription();

  return (
    <div className="h-full relative bg-[#202025] min-h-[100vh]">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar isPremium={isPremium} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72 h-full">
        <section className="h-[100vh] lg:pr-[10px] lg:pb-[8px] lg:pt-[8px] grow">
          <div className="bg-[#171719] overflow-auto pb-6 h-full lg:rounded-xl shadow-sm md:border md:border-[rgba(56,56,58,.6)]">
            <Navbar />
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout