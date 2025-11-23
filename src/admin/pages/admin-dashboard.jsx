import React from "react";
import DashboardMetric from "../components/dashboard-metric";
import DashboardGraph from "../components/dashboard-graph";
import Swal from "sweetalert2";
import Spinner from "../components/spinner-animation";

import useFetchDashboardData from "../../services/dashboard-services";
function AdminDashboard() {
  const { metrics, graph, loading } = useFetchDashboardData();

  if (loading) {
    return <Spinner />;
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const sampleButton = () => {
    (async () => {
      await Toast.fire({
        icon: "error",
        title: "Opss...",
        text: "Failed to fetch data.",
      });
    })();
  };
  return (
    <div className="w-full h-screen flex flex-col gap-10  overflow-auto md:h-[600px] scrollbar-hidden scroll-smooth">
      <div>
        <DashboardMetric data={metrics} />
      </div>

      <div className="w-full ">
        <DashboardGraph graph_data={graph}/>
      </div>
    </div>
  );
}

export default AdminDashboard;
