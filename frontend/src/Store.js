import { ADD_TO_CART, REMOVE_FROM_CART, useReducer, createContext } from './Imports';

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems'))
            :
            []
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find((item) => item._id === newItem._id);
            const cartItems = existingItem ? state.cart.cartItems.map((item) => item._id === existingItem._id ? newItem : item)
                :
                [...state.cart.cartItems, newItem];

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };

        case REMOVE_FROM_CART:
            {
                const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id
                );
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                return { ...state, cart: { ...state.cart, cartItems } }
            }

        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const body = { state, dispatch };

    return <Store.Provider value={body}>
        {props.children}
    </Store.Provider>
}