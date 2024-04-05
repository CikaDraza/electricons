import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const BackofficeStateContext = createContext();

const savedProduct = Cookies.get('product');
const parsedProduct = savedProduct ? JSON.parse(savedProduct) : {};

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
    title: parsedProduct.title || '',
    slug: parsedProduct.slug || '',
    shortDescription: parsedProduct.shortDescription || '',
    description: parsedProduct.description || '',
    details: parsedProduct.details || [],
    images: parsedProduct.images || [],
    heroImages: parsedProduct.heroImages || '',
    brand: parsedProduct.brand || '',
    brandSlug: parsedProduct.brandSlug || '',
    brandImg: parsedProduct.brandImg || '',
    brandUrl: parsedProduct.brandUrl || '',
    category: parsedProduct.category || '',
    categoryUrl: parsedProduct.categoryUrl || '',
    subCategory: parsedProduct.subCategory || '',
    subCategoryUrl: parsedProduct.subCategoryUrl || '',
    price: parsedProduct.price || 0,
    oldPrice: parsedProduct.oldPrice || 0,
    currency: parsedProduct.currency || '',
    inStock: parsedProduct.inStock || 0,
    sku: parsedProduct.sku || '',
    stockStatus: parsedProduct.stockStatus || '',
    stores: parsedProduct.stores || [],
    shipping: parsedProduct.shipping || {}
  }
};

function reducer(state_office, action) {
  switch(action.type) {
    case 'CREATE_PRODUCT': {
      const createProduct = { ...state_office.product, ...action.payload };
      Cookies.set('product', JSON.stringify(createProduct));
      return { ...state_office, product: createProduct };
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
