import React from "react";
// import { Outlet } from "react-router-dom";
import ProductResults from "./../../components/ProductResults";

const Search = () => {
    return (
        <div className="searchPage">
            {/* <Outlet /> */}
            <ProductResults />
        </div>
    );
};

export default Search;
