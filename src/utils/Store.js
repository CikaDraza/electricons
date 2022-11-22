import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
    personalInfo: Cookies.get('personalInfo') ? JSON.parse(Cookies.get('personalInfo')) : {},
    addresses: Cookies.get('addresses') ? JSON.parse(Cookies.get('addresses')) : [],
    shipping: Cookies.get('shipping') ? JSON.parse(Cookies.get('shipping')) : {},
    payment: Cookies.get('payment') ? JSON.parse(Cookies.get('payment')) : {},
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
        return { ...state, cart: { ...state.cart, cartItems }, snack: { ...state.snack, message: 'item successfully removed', severity: 'warning'} };
      }else {
        const cartItems = state.cart.cartItems.filter(item => item._id !== action.payload._id);
        Cookies.set('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems }, snack: { ...state.snack, message: 'item successfully removed', severity: 'warning'}};
      }
    }
    case 'PERSONAL_INFO': {
      return { ...state, cart: { ...state.cart, personalInfo: action.payload } };
    }
    case 'ADDRESSES': {
      const newItem = action.payload;
      const existItem = state.cart.addresses.find(item => item.address === newItem.address && item.city === newItem.city);
      const addresses = existItem ? state.cart.addresses.map(item => item.address === existItem.address ? newItem : item)
      : [...state.cart.addresses, newItem];
      Cookies.set('addresses', JSON.stringify(addresses));
      return { ...state, cart: { ...state.cart, addresses } };
    }
    case 'ADDRESSES_REMOVE': {
      if(action.payload.length > 0) {
        const toDelete = action.payload;
        const attr = toDelete[0].address + toDelete[0].city;
        const addresses = state.cart.addresses.filter((item) => item.address + item.city !== attr);
        Cookies.set('addresses', JSON.stringify(addresses));
        return { ...state, cart: { ...state.cart, addresses }, snack: { ...state.snack, message: 'address successfully removed', severity: 'warning'} };
      }else {
        const addresses = state.cart.addresses.filter(item => item.address + item.city !== action.payload.address + action.payload.city);
        Cookies.set('addresses', JSON.stringify(addresses));
        return { ...state, cart: { ...state.cart, addresses }, snack: { ...state.snack, message: 'address successfully removed', severity: 'warning'}};
      }
    }
    case 'SHIPPING': {
      return { ...state, cart: { ...state.cart, shipping: action.payload } };
    }
    case 'PAYMENT': {
      return { ...state, cart: { ...state.cart, payment: action.payload } };
    }
    case 'SNACK_MESSAGE': {
      return { ...state, snack: action.payload };
    }
    case 'USER_LOGIN': {
      return { ...state, userInfo: action.payload };
    }
    case 'USER_LOGOUT': {
      return { ...state, userInfo: null, snack: action.payload };
    }
    case 'PEROSNAL_REMOVE': {
      return { ...state, cart: { ...state.cart, personalInfo: {} } };
    }
    case 'ADDRESSES_REMOVE': {
      return { ...state, cart: { ...state.cart, addresses: {} } };
    }
    default:
      return { ...state, snack: {message: '', severity: ''} };
  }
}


export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>{props.children}</Store.Provider>
  )
}
