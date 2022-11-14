import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
    personalInfo: Cookies.get('personalInfo') ? JSON.parse(Cookies.get('personalInfo')) : {},
  },
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
  snack: {
    message: '',
    severity: ''
  }
};

function reducer(state, action) {
  switch(action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(item => item._id === newItem._id);
      const cartItems = existItem ? state.cart.cartItems.map(item => item._id === existItem._id ? newItem : item)
      : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems }, snack: { ...state.snack, message: 'item successfully added', severity: 'success'}};
    }
    case 'CART_REMOVE_ITEM': {
      if(action.payload.length > 0) {
        const arr = action.payload.map(a => a._id);
        const cartItems = state.cart.cartItems.filter( item => !arr.includes(item._id));
        Cookies.set('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems }, snack: { ...state.snack, message: 'item successfully removed', severity: 'error'} };
      }else {
        const cartItems = state.cart.cartItems.filter(item => item._id !== action.payload._id);
        Cookies.set('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems }, snack: { ...state.snack, message: 'item successfully removed', severity: ''}};
      }
    }
    case 'PERSONAL_INFO': {
      return { ...state, cart: { ...state.cart, personalInfo: action.payload } };
    }
    case 'USER_LOGIN': {
      return { ...state, userInfo: action.payload, snack: action.payload };
    }
    case 'SUCCESS_LOGIN': {
      return { ...state, snack: action.payload };
    }
    case 'SUCCESS_REGISTER': {
      return { ...state, snack: action.payload };
    }
    case 'USER_LOGOUT': {
      return { ...state, userInfo: null };
    }
    case 'GUEST_REMOVE': {
      return { ...state, cart: { ...state.cart, personalInfo: {} } };
    }
    default:
      return state;
  }
}


export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>{props.children}</Store.Provider>
  )
}
