import { createSelector } from "reselect";

export const selectCartData = (state) => state.cartData;

export const selectCartItems = createSelector(
    [selectCartData],
    (cartData) => cartData.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) =>
        cartItems.reduce(
            (quantity, cartItems) => quantity + cartItems.quantity,
            0
        )
);
