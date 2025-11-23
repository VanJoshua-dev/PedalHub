import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchDashboardData() {
    const [metrics, setMetrics] = useState(null);
    const [graph, setGraph] = useState(null);
    const [loading, setLoading] = useState(true);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });

    const get_metric_data = async () => {
        try {
            const [metricRes, graphRes] = await Promise.all([
                axios.get("http://localhost:5000/api/dashboard/metric_data"),
                axios.get("http://localhost:5000/api/dashboard/graph_data"),
            ]);

            console.log("Metric_Data: ", metricRes)
            console.log("Graph_Data: ", graphRes)

            setMetrics(metricRes.data?.metric_data ?? null);
            setGraph(graphRes.data?.graph_data ?? null);

        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Fetch Error",
                text: error?.response?.data?.message || "Network error or service is down",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get_metric_data();
    }, []);

    return { metrics, graph, loading };
};


