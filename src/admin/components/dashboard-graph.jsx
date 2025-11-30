import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// Icons
import { FaChartLine, FaChartPie } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdStats } from "react-icons/io";

export default function DashboardGraph(graph) {
  console.log(graph.graph_data.stock_levels);

  const graph_data = [
    graph.graph_data.sales_over_time || [],
    graph.graph_data.top_selling_products || [],
    graph.graph_data.revenue_by_category || [],
    graph.graph_data.stock_levels || [],
  ];

  console.log("Graphs: ", graph_data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[800px] px-2 py-2">
      {/* Chart 1 — Sales Over Time */}
      <div className="bg-white rounded-xl shadow p-2">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          Sales Over Time <FaChartLine size={20} />
        </h2>

        {graph_data[0].length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graph_data[0]}>
              <CartesianGrid stroke="#ccc" />
              <Line
                type="monotone"
                dataKey="total_sales"
                stroke="#8962E1"
                strokeWidth={3}
              />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-500">
            No sales data available.
          </div>
        )}
      </div>

      {/* Chart 2 — Top Selling Products */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          Top Selling Products <MdBarChart size={20} />
        </h2>

        {graph_data[1].length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graph_data[1]}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_sold" fill="#2196F3" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-500">
            No top-selling product data available.
          </div>
        )}
      </div>

      {/* Chart 3 — Revenue by Category */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          Revenue by Category <FaChartPie size={20} />
        </h2>

        {graph_data[2].length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graph_data[2]}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#19D895" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-500">
            No revenue data available.
          </div>
        )}
      </div>

      {/* Chart 4 — Stock Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          Low Stock Levels <IoMdStats size={20} />
        </h2>

        <div className="overflow-x-auto max-h-[300px]">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Stock Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {graph_data[3]?.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {graph_data[3]?.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No stock data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
