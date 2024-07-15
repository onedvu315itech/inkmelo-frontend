import { ADDTOCART } from "./actions";

export const initialState = {
    username: '',
    quantity: 0,
    items: []
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case ADDTOCART: {
            const { username, quantity, items } = action.payload;
            return {
                ...state,
                username: username,
                quantity: quantity,
                items: items
            }
        }
        default: {
            return { ...state };
        }
    }
}

export default cart;