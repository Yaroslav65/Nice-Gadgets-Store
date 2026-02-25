import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ProdSpec, ProductDetails } from '../types/Product';
import { Spec } from '../shared/components/ProductSpecs';
import { useParams } from 'react-router-dom';
import { ProductDetailsType } from '../types/ProductDetailsType';
import { ProductContext } from './ProductContext';
import { getProductDetails } from '../api';

export const ProductDetailsContext =
  React.createContext<ProductDetailsType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ProductDetailsProvider: React.FC<Props> = ({ children }) => {
  const [productDetails, setProductDetails] = useState<
    ProductDetails | undefined
  >(undefined);
  const [productSpec, setProductSpec] = useState<Spec[]>([]);
  const [isLoadingId, setIsLoadingId] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { isDataReady } = useContext(ProductContext);
  const { productId } = useParams();

  const validId = productId ? productId.toString() : '';

  useEffect(() => {
    if (!validId || !isDataReady) {
      return;
    }

    setHasError(false);
    setIsLoadingId(true);
    setProductDetails(undefined);
    setProductSpec([]);

    getProductDetails(validId)
      .then((data: ProductDetails) => {
        setProductDetails(data);

        const specsObj: ProdSpec = {
          screen: data.screen,
          resolution: data.resolution,
          processor: data.processor,
          ram: data.ram,
          capacity: data.capacity,
          cell: data.cell,
        };

        if (data.camera && data.zoom) {
          specsObj.camera = data.camera;
          specsObj.zoom = data.zoom;
        }

        const arr: Spec[] = Object.entries(specsObj).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: Array.isArray(value) ? value.join(', ') : value,
        }));

        const names = [
          'Screen',
          'Resolution',
          'Processor',
          'Ram',
          'Capacity',
          'Camera',
          'Zoom',
          'Cell',
        ];

        const filteredSpecs: Spec[] = [];

        names.forEach(name => {
          arr.find(a => {
            if (a.name === name) {
              filteredSpecs.push(a);
            }
          });
        });

        setProductSpec(filteredSpecs);
      })
      .catch(() => {
        setHasError(true);
        setProductDetails(undefined);
        setProductSpec([]);
      })
      .finally(() => {
        setIsLoadingId(false);
        setIsInitialized(true);
      });
  }, [validId, isDataReady]);

  const value = useMemo(
    () => ({
      productSpec,
      productDetails,
      isLoadingId,
      hasError,
      isInitialized,
    }),
    [productSpec, productDetails, isLoadingId, hasError, isInitialized],
  );

  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
};

export const useDetails = () => {
  const details = useContext(ProductDetailsContext) as ProductDetailsType;

  return details;
};
