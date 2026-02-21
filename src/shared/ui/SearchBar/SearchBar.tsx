import { useContext, useMemo, useRef, useState } from 'react';
import { IconId } from '../../../types/icons';
import { Icons } from '../Icons';
import style from './SearchBar.module.scss';
import { ProductContext } from '../../../store/ProductContext';
import { SearchItem } from './components/SearchItem';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [closeField, setCloseField] = useState(false);

  const { products } = useContext(ProductContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const checkInputFocus = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const clearField = () => {
    setQuery('');
    checkInputFocus();
  };

  const handleQueryChange = (newValue: string) => {
    setCloseField(false);
    setQuery(newValue);
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
    return products.filter(product =>
      product.name.toLowerCase().includes(query),
    );
  }, [query, products]);

  const displayedProducts = filteredProducts.slice(0, 8);

  return (
    <div className={style.searchField}>
      <button className={style.searchButton}>
        <Icons id={IconId.Search} className={style.searchIcon} />
      </button>
      {query && (
        <button className={style.clearButton} onClick={clearField}>
          <Icons id={IconId.Close} />
        </button>
      )}
      <input
        type="text"
        placeholder="Start searching"
        className={style.field}
        value={query}
        onChange={event => {
          handleQueryChange(event.target.value);
        }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={inputRef}
      />

      {query && closeField !== true && (
        <div className={style.productsField}>
          {displayedProducts.map(product => (
            <SearchItem
              product={product}
              key={product.id}
              setQuery={setQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
};
