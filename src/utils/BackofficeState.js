import React from 'react';
import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const BackofficeStateContext = createContext();

const savedProduct = Cookies.get('product');
const parsedProduct = savedProduct ? JSON.parse(savedProduct) : {};

const initialState = {
  product: {
    title: parsedProduct?.product?.title || '',
    slug: parsedProduct?.product?.slug || '',
    shortDescription: parsedProduct?.product?.shortDescription || '',
    description: parsedProduct?.product?.description || '',
    details: parsedProduct?.product?.details || [],
    price: parsedProduct?.product?.price || 0,
    oldPrice: parsedProduct?.product?.oldPrice || 0,
    currency: parsedProduct?.product?.currency || '',
    inStock: parsedProduct?.product?.inStock || 0,
    sku: parsedProduct?.product?.sku || '',
    stockStatus: parsedProduct?.product?.stockStatus || '',
    stores: parsedProduct?.product?.stores || [],
    shipping: parsedProduct?.product?.shipping || {},
    brand: {
      brandImg: '',
      brandName: '',
      brandPublish: '',
      brandSlug: '',
      brandUrl: ''
    },
    images: [{
      image: '',
      imageUrl: ''
    }],
    heroImage: [{
      image: '',
      iamgeUrl: ''
    }]
  }
};

function reducer(state_office, action) {
  switch(action.type) {
    case 'CREATE_PRODUCT': {
      const createProduct = { ...state_office.product, ...action.payload };
      const newState = { ...state_office, product: createProduct };
      Cookies.set('product', JSON.stringify(newState));
      return newState;
    }
    case 'SET_BRAND': {
      return { ...state_office, product: { ...state_office.product, brand: action.payload } };
    }
    case 'SET_IMAGES': {
      return { ...state_office, product: { ...state_office.product, images: action.payload } };
    }
    case 'SET_HERO_IMAGES': {
      return { ...state_office, product: { ...state_office.product, heroImage: action.payload } };
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
