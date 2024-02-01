import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const BackofficeStateContext = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
    personalInfo: Cookies.get('personalInfo') ? JSON.parse(Cookies.get('personalInfo')) : {},
    addresses: Cookies.get('addresses') ? JSON.parse(Cookies.get('addresses')) : [],
    shipping: Cookies.get('shipping') ? JSON.parse(Cookies.get('shipping')) : {},
    payment: Cookies.get('payment') ? JSON.parse(Cookies.get('payment')) : {},
    cupon_discount: Cookies.get('cupon_discount') ? Cookies.get('cupon_discount') : {},
  },
  comparasion: {
    compareItems: Cookies.get('compareItems') ? JSON.parse(Cookies.get('compareItems')) : []
  },
  wishlist: {
    wishItems: Cookies.get('wishItems') ? JSON.parse(Cookies.get('wishItems')) : []
  },
  uploadImage: {
    change: false
  },
  review: {
    hasReview: false,
    hasRated: false,
    orderId: null
  },
  product: {
    title: Cookies.get('title') ? JSON.parse(Cookies.get('title')) : '',
    slug: Cookies.get('slug') ? JSON.parse(Cookies.get('slug')) : '',
    shortDescription: Cookies.get('short_description') ? JSON.parse(Cookies.get('short_description')) : '',
    description: Cookies.get('description') ? JSON.parse(Cookies.get('description')) : '',
    details: Cookies.get('details') ? JSON.parse(Cookies.get('details')) : [],
    images: Cookies.get('images') ? JSON.parse(Cookies.get('images')) : [],
    widgetImages: Cookies.get('images') ? JSON.parse(Cookies.get('images')) : [],
    brand: Cookies.get('brand') ? JSON.parse(Cookies.get('brand')) : '',
    brandSlug: Cookies.get('brandSlug') ? JSON.parse(Cookies.get('brandSlug')) : '',
    brandImg: Cookies.get('brandImg') ? JSON.parse(Cookies.get('brandImg')) : '',
    brandUrl: Cookies.get('brandUrl') ? JSON.parse(Cookies.get('brandUrl')) : '',
    price: 0,
    oldPrice: 0
  }
};

function reducer(state_office, action) {
  switch(action.type) {
    case 'CREATE_PRODUCT': {
      const newItem = action.payload;
      Cookies.set('product', JSON.stringify(action.payload));
      return { ...state_office, product: newItem };
    }
    default:
      return { ...state_office };
  }
}



export function BackofficeProvider(props) {
  const [state_office, dispatch_office] = useReducer(reducer, initialState);
  const value = { state_office, dispatch_office };
  return (
    <BackofficeStateContext.Provider value={value}>
      {props.children}
    </BackofficeStateContext.Provider>
  )
}
