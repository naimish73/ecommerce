import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import "./styles.scss";
import Product from "./Product";

const mapState = ({ productsData }) => ({
    products: productsData.products,
});

const ProductResults = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

    useEffect(() => {
        dispatch(fetchProductsStart());
    }, []);

    if (!Array.isArray(products)) return null;

    if (products.length < 1) {
        return (
            <div className="products">
                <p>No search results...</p>
            </div>
        );
    }

    // console.log(products, "ggg");

    return (
        <div className="products">
            <h1>Browse Products</h1>
            <div className="productResults">
                {products.map((products, pos) => {
                    const { productThumbnail, productName, productPrice } =
                        products;
                    if (
                        !productThumbnail ||
                        !productName ||
                        typeof productPrice === "undefined"
                    )
                        return null;

                    const configProduct = {
                        productThumbnail,
                        productName,
                        productPrice,
                    };
                    return <Product {...configProduct} />;
                })}
            </div>
        </div>
    );
};

export default ProductResults;
