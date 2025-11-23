import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

export default function useFetchAllProducts(params = {}) {

    console.log("Params: ", params)
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);

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

    const get_all_products = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/all-products?search=${params.search}&brand=${params.brand}&category=${params.category}&status=${params.status}`);
            setProducts(response.data.products);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Fetch Error",
                text: error?.response?.data?.message || "Network error or service is down",
            });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        get_all_products();
    }, [JSON.stringify(params)]);

    return { products, loading }
}