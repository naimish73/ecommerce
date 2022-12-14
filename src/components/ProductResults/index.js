import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import "./styles.scss";
import Product from "./Product";
import FormSelect from "../FormSelect";
import LoadMore from "../LoadMore";
import { useNavigate, useParams } from "react-router-dom";

const mapState = ({ productsData }) => ({
    products: productsData.products,
});

const ProductResults = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filterType } = useParams();
    const { products } = useSelector(mapState);
    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(fetchProductsStart({ filterType }));
    }, [dispatch, filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        navigate(`/search/${nextFilter}`);
    };

    if (!Array.isArray(data)) return null;

    if (products.length < 1) {
        return (
            <div className="products">
                <p>No search results...</p>
            </div>
        );
    }

    const configFilters = {
        defaultValue: filterType,
        options: [
            { name: "Show all", value: "" },
            { name: "Mens", value: "mens" },
            { name: "Womens", value: "womens" },
        ],
        handleChange: handleFilter,
    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                filterType,
                startAfterDoc: queryDoc,
                persistProducts: data,
            })
        );
    };
    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore,
    };

    return (
        <div className="products">
            <h1>Browse Products</h1>
            <FormSelect {...configFilters} />
            <div className="productResults">
                {data.map((products, pos) => {
                    const { productThumbnail, productName, productPrice } =
                        products;
                    if (
                        !productThumbnail ||
                        !productName ||
                        typeof productPrice === "undefined"
                    )
                        return null;

                    const configProduct = {
                        ...products,
                    };
                    return <Product {...configProduct} />;
                })}
            </div>
            {!isLastPage && <LoadMore {...configLoadMore} />}
        </div>
    );
};

export default ProductResults;
