import type { ChartItem } from "../../lib/data/dashboard";

export default function UsersDetailsCard({ chartData }: { chartData: ChartItem[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Users Details</h3>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-red-600 mb-2">66.5% more users</p>
        <p className="text-sm text-gray-600">
          The users are measured from the time that the redesign was fully implemented and after the first e-mailing.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-3">Last 7 days comparison</h4>
        <div className="w-full h-32 bg-gray-50 rounded-lg p-3">
          <div className="flex items-end justify-between h-full">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-3 bg-purple-500 rounded-t mb-1" style={{ height: `${item.value}px` }} />
                <span className="text-xs text-gray-600">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
