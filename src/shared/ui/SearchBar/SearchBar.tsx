import { useRef, useState } from 'react';
import { IconId } from '../../../types/icons';
import { Icons } from '../Icons';
import style from './SearchBar.module.scss';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

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
    setQuery(newValue);
  };

  return (
    <div className={style.searchField}>
      <button className={style.searchButton}>
        <Icons id={IconId.Search} />
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
        ref={inputRef}
      />
    </div>
  );
};
