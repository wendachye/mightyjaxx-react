import ProductCreate from 'views/Products/ProductCreate';
import ProductList from 'views/Products/ProductList';
import ProductUpdate from 'views/Products/ProductUpdate';

export const ProtectedRoutes = [
  {
    element: <ProductList />,
    path: '/products',
  },
  {
    element: <ProductCreate />,
    path: '/products/create',
  },
  {
    element: <ProductUpdate />,
    path: '/products/:sku',
  },
];
