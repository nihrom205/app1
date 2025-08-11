export type RecentActivityCircle = { value: number; label: string };
export type RecentMetric = { label: string; value: number; progress: number };
export type StatisticIcon = "download" | "eye" | "user" | "smile" | "thumbsUp" | "refresh";
export type StatisticItem = { icon: StatisticIcon; value: string; label: string };
export type ChartItem = { date: string; value: number };

export type DashboardData = {
  recentActivities: {
    circles: RecentActivityCircle[];
    metrics: RecentMetric[];
  };
  statistics: StatisticItem[];
  chartData: ChartItem[];
};

export const dashboardData: DashboardData = {
  recentActivities: {
    circles: [
      { value: 18, label: "Users" },
      { value: 26, label: "Pageviews" },
      { value: 34, label: "Visitors" },
    ],
    metrics: [
      { label: "Users", value: 214, progress: 80 },
      { label: "Pageviews", value: 756, progress: 70 },
      { label: "Bounce Rates", value: 291, progress: 60 },
      { label: "Visits", value: 32301, progress: 90 },
      { label: "Pages", value: 132, progress: 50 },
    ],
  },
  statistics: [
    { icon: "download", value: "+1100", label: "Downloads" },
    { icon: "eye", value: "+930", label: "Visits" },
    { icon: "user", value: "570", label: "New users" },
    { icon: "smile", value: "+900", label: "Happy users" },
    { icon: "thumbsUp", value: "10", label: "Improvements" },
    { icon: "refresh", value: "2", label: "Update done" },
  ],
  chartData: [
    { date: "3-7", value: 20 },
    { date: "4-7", value: 35 },
    { date: "5-7", value: 25 },
    { date: "6-7", value: 45 },
    { date: "7-7", value: 30 },
    { date: "8-7", value: 40 },
    { date: "9-7", value: 50 },
  ],
};
