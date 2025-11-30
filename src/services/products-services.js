import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

export default function useFetchAllProducts(params = {}) {

    console.log("Params: ", params)
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

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
};


export const useCreateProduct = (
    { productName, description, basePrice, brand, categoryId, image, stock },
    onSave,
    onClose
) => {

    const [loading, setLoading] = useState(false);
    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        showClass: {
            popup: "animate_animated animate__fadeIn",
        },
        hideClass: {
            popup: "animate__animated animate__bounceOutRight",
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (!productName || !description || !basePrice || !brand || !categoryId || !image?.file || !stock) {
            Toast.fire({ icon: "error", title: "Please fill in all required fields." });
            return;
        }

        const formData = new FormData();
        formData.append("Prodname", productName);
        formData.append("brand", brand);
        formData.append("categoryId", categoryId);
        formData.append("description", description);
        formData.append("basePrice", basePrice);
        formData.append("stock", stock);
        formData.append("imageUrl", image.file);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/products/create-new-product",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            Toast.fire({ icon: "success", title: "Product Added!" });

            onSave?.(response.data);

            if (response) {
                onClose?.();
            }
        }
        catch (error) {
            Toast.fire({
                icon: "error",
                title: "Opss...",
                text: error?.response?.data?.message || "Netwrok error or server is down",
            });
            console.error(error);
        } finally {
            setLoading(false)

        }
    };


    return { handleSubmit, loading };
};


export const useEditproduct = (initialProduct, onSave, onClose) => {
    console.log("Initials: ", initialProduct)
    const [loading, setLoading] = useState(false);
    const [productName, setProductName] = useState(initialProduct?.Name || "");
    const [brand, setBrand] = useState(initialProduct?.Brand || "");
    const [categoryId, setCategoryId] = useState(initialProduct?.CategoryId || "");
    const [basePrice, setBasePrice] = useState(initialProduct?.BasePrice || "");
    const [description, setDescription] = useState(initialProduct?.Description || "");
    const [stock, setStock] = useState(initialProduct?.TotalStock || "");
    const [image, setImage] = useState(null);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        showClass: {
            popup: "animate_animated animate__fadeIn",
        },
        hideClass: {
            popup: "animate__animated animate__bounceOutRight",
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("description", description);
            formData.append("basePrice", basePrice);
            formData.append("brand", brand);
            formData.append("categoryId", categoryId);
            formData.append("stock", stock);

            if (image?.file) {
                formData.append("imageUrl", image.file);
            }

            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Save",
                denyButtonText: `Cancel`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.put(
                        `http://localhost:5000/api/products/update-product/${initialProduct.productId}`,
                        formData,
                        { headers: { "Content-Type": "multipart/form-data" } }
                    );

                    Toast.fire({ icon: "success", title: "Product updated!", text: "You've updated product record." });

                    onSave && onSave(res.data.updatedProduct);
                    if (res) {
                        onClose && onClose();
                    }
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                    onClose && onClose();
                }
            });




        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Update failed",
                text: error?.response?.data?.message
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        productName, setProductName,
        brand, setBrand,
        categoryId, setCategoryId,
        basePrice, setBasePrice,
        description, setDescription,
        stock, setStock,
        image, setImage,
        handleSubmit
    };
}



export const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false); // Added for button state

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        showClass: {
            popup: "animate_animated animate__fadeIn",
        },
        hideClass: {
            popup: "animate__animated animate__bounceOutRight",
        },
    });

    const handleDelete = async (id, productName) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You're about to delete "${productName}" from the product list. You won't be able to revert this.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            setLoading(true); // Start loading for button

            // Show loading Swal
            Swal.fire({
                title: "Deleting...",
                text: "Please wait while we delete the product.",
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            try {
                const res = await axios.delete(`http://localhost:5000/api/products/delete-product/${id}`);
                if (res.status === 200) {
                    // Close loading and show success
                    Swal.close();
                    Toast.fire({
                        icon: "success",
                        title: "Product deleted",
                        text: `You've deleted "${productName}" from the product list.`,
                    });
                    // Optionally, trigger a callback or refresh here if needed
                }
            } catch (error) {
                // Close loading and show error
                Swal.close();
                Toast.fire({
                    icon: "error",
                    title: "Delete failed",
                    text: error?.response?.data?.message || "Network error or server is down.",
                });
            } finally {
                setLoading(false); // Stop loading for button
            }
        } else if (result.isDismissed) {
            Swal.fire("Deletion cancelled", "", "info");
        }
    };

    return { handleDelete, loading };
};

