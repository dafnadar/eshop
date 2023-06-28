import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, USER_SIGNIN, USER_SIGNOUT, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD } from '../Imports'

export const storeReducer = (state, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            const newItem = payload;
            const existingItem = state.cart.cartItems.find((item) => item._id === newItem._id);
            const cartItems = existingItem ? state.cart.cartItems.map((item) => item._id === existingItem._id ? newItem : item)
                :
                [...state.cart.cartItems, newItem];

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        case REMOVE_FROM_CART:
            {
                const cartItems = state.cart.cartItems.filter((item) => item._id !== payload._id
                );
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                return { ...state, cart: { ...state.cart, cartItems } }
            }
        case CLEAR_CART:
            {
                return { ...state, cart: { ...state.cart, cartItems: [] } };
            }
        case USER_SIGNIN:
            {
                return { ...state, userInfo: payload };
            }
        case USER_SIGNOUT:
            {
                return { ...state, userInfo: null, cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' } };
            }
        case SAVE_SHIPPING_ADDRESS:
            {
                return { ...state, cart: { ...state.cart, shippingAddress: payload } };
            }
        case SAVE_PAYMENT_METHOD:
            {
                return { ...state, cart: { ...state.cart, paymentMethod: payload } };
            }
        default:
            return state
    }
}