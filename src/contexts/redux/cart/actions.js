export const ADDTOCART = 'ADDTOCART';

export const addToCartAction = (username, quantity, items) => ({
    type: ADDTOCART,
    payload: { username, quantity, items }
})