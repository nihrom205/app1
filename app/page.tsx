import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import RecentActivitiesCard from "@/components/dashboard/RecentActivitiesCard";
import AboutCard from "@/components/dashboard/AboutCard";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import UsersDetailsCard from "@/components/dashboard/UsersDetailsCard";
import { dashboardData } from "@/lib/data/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivitiesCard data={dashboardData.recentActivities} />
            <AboutCard />
            <StatisticsCard items={dashboardData.statistics} />
            <UsersDetailsCard chartData={dashboardData.chartData} />
          </div>
        </main>
      </div>
    </div>
  );
}
