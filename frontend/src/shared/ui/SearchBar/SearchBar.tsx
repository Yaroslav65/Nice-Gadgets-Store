import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IconId } from '../../../types/icons';
import { Icons } from '../Icons';
import style from './SearchBar.module.scss';
import { ProductContext } from '../../../store/ProductContext';
import { SearchItem } from './components/SearchItem';

export const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [closeField, setCloseField] = useState(false);

  const { products } = useContext(ProductContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = inputValue.trim().length > 0;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(inputValue.trim().toLowerCase());
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [inputValue]);

  const checkInputFocus = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const clearField = () => {
    setInputValue('');
    setDebouncedQuery('');
    checkInputFocus();
  };

  const handleQueryChange = (newValue: string) => {
    setCloseField(false);
    setInputValue(newValue);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setCloseField(true);
    }, 100);
  };

  const handleFocus = () => {
    setCloseField(false);
  };

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) {
      return [];
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(debouncedQuery),
    );
  }, [debouncedQuery, products]);

  const displayedProducts = filteredProducts.slice(0, 8);

  return (
    <div className={style.searchField}>
      <button type='button' className={style.searchButton}>
        <Icons id={IconId.Search} className={style.searchIcon} />
      </button>
      {hasQuery && (
        <button type='button' className={style.clearButton} onClick={clearField}>
          <Icons id={IconId.Close} />
        </button>
      )}
      <input
        type='text'
        placeholder='Start searching'
        className={style.field}
        value={inputValue}
        onChange={event => {
          handleQueryChange(event.target.value);
        }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={inputRef}
      />

      {debouncedQuery && closeField !== true && (
        <div className={style.productsField}>
          {displayedProducts.map(product => (
            <SearchItem
              product={product}
              key={product.id}
              setQuery={setInputValue}
            />
          ))}
        </div>
      )}
    </div>
  );
};
