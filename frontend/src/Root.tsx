import { lazy } from 'react';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { ThemeProvider } from './store/ThemeContext';
import { ProductProvider } from './store/ProductContext';
import { FiltersProvider } from './store/FiltersContext';
import { PaginationProvider } from './store/PaginationContext';
import ScrollToTop from './shared/components/ScrollToTop/ScrollToTop';
import { ProductDetailsProvider } from './store/ProductDetailsContext';
import { CartProvider } from './store/CartContext';
import { FavouritesProvider } from './store/FavouritesContext';

const HomePage = lazy(() =>
  import('./modules/HomePage').then(module => ({ default: module.HomePage })),
);
const PhonesPage = lazy(() =>
  import('./modules/PhonesPage').then(module => ({ default: module.PhonesPage })),
);
const TabletsPage = lazy(() =>
  import('./modules/TabletsPage').then(module => ({ default: module.TabletsPage })),
);
const AccessoriesPage = lazy(() =>
  import('./modules/AccessoriesPage').then(module => ({
    default: module.AccessoriesPage,
  })),
);
const ProductDetailsPage = lazy(() =>
  import('./modules/ProductDetailsPage').then(module => ({
    default: module.ProductDetailsPage,
  })),
);
const FavouritesPage = lazy(() =>
  import('./modules/FavouritesPage').then(module => ({
    default: module.FavouritesPage,
  })),
);
const CartPage = lazy(() =>
  import('./modules/CartPage').then(module => ({ default: module.CartPage })),
);
const PageNotFound = lazy(() =>
  import('./modules/PageNotFound').then(module => ({
    default: module.PageNotFound,
  })),
);

export const Root = () => (
  <Router>
    <ProductProvider>
      <CartProvider>
        <FavouritesProvider>
          <FiltersProvider>
            <PaginationProvider>
              <ThemeProvider>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<App />}>
                    <Route path='home' element={<Navigate to='/' />} />
                    <Route index element={<HomePage />} />
                    <Route path='phones' element={<PhonesPage />} />
                    <Route
                      path='phones/:productId?'
                      element={
                        <ProductDetailsProvider>
                          <ProductDetailsPage />
                        </ProductDetailsProvider>
                      }
                    ></Route>
                    <Route path='tablets' element={<TabletsPage />} />
                    <Route
                      path='tablets/:productId?'
                      element={
                        <ProductDetailsProvider>
                          <ProductDetailsPage />
                        </ProductDetailsProvider>
                      }
                    ></Route>
                    <Route path='accessories' element={<AccessoriesPage />} />
                    <Route
                      path='accessories/:productId?'
                      element={
                        <ProductDetailsProvider>
                          <ProductDetailsPage />
                        </ProductDetailsProvider>
                      }
                    ></Route>
                    <Route path='favourites' element={<FavouritesPage />} />
                    <Route path='cart' element={<CartPage />} />
                    <Route path='*' element={<PageNotFound />} />
                  </Route>
                </Routes>
              </ThemeProvider>
            </PaginationProvider>
          </FiltersProvider>
        </FavouritesProvider>
      </CartProvider>
    </ProductProvider>
  </Router>
);
