import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Summary() {
  const salesData = [
    { name: 'Jan', sales: 3200 },
    { name: 'Feb', sales: 2900 },
    { name: 'Mar', sales: 4100 },
    { name: 'Apr', sales: 3800 },
    { name: 'May', sales: 4600 },
    { name: 'Jun', sales: 3900 },
    { name: 'Jul', sales: 4400 },
    { name: 'Aug', sales: 4700 },
    { name: 'Sep', sales: 4300 },
    { name: 'Oct', sales: 4800 },
    { name: 'Nov', sales: 5000 },
    { name: 'Dec', sales: 5300 },
  ];

  return (
    <div className="w-full flex items-center justify-center gap-2 mt-8">
      <div className="w-full h-90 bg-white p-4 shadow ">
        <h1 className="pb-2 mb-4 border-b-2 border-gray-300 text-lg font-semibold">📈 Monthly Sales Summary</h1>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Summary;
