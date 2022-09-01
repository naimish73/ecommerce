import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
    fetchProductStart,
    setProduct,
} from "../../redux/Products/products.actions";
import "./styles.scss";
import Button from "../forms/Button";
import { addProduct } from "./../../redux/Cart/cart.actions";

const mapState = (state) => ({
    product: state.productsData.product,
});

const ProductCart = ({}) => {
    const dispatch = useDispatch();
    const { productID } = useParams();
    const { product } = useSelector(mapState);

    const { productThumbnail, productName, productPrice, productDesc } =
        product;

    useEffect(() => {
        dispatch(fetchProductStart(productID));
        return () => {
            dispatch(setProduct({}));
        };
    }, [dispatch, productID]);

    const handleAddToCart = (product) => {
        if (!product) return;
        dispatch(addProduct(product));
    };

    const configAddToCartButton = {
        type: "button",
    };

    return (
        <div className="productCart">
            <div className="hero">
                <img src={productThumbnail} alt="product thumbnail" />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>{productName}</h1>
                    </li>
                    <li>
                        <span>${productPrice}</span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button
                                {...configAddToCartButton}
                                onClick={() => {
                                    handleAddToCart(product);
                                }}
                            >
                                Add to cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span
                            dangerouslySetInnerHTML={{ __html: productDesc }}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductCart;
