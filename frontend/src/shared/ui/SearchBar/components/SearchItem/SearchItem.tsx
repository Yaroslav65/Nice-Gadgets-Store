import { Link, useSearchParams } from 'react-router-dom';
import { SearchIt } from '../../../../../types/Product';
import style from './SearchItem.module.scss';
import { Stars } from '../../../Stars';

type Props = {
  product: SearchIt;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchItem: React.FC<Props> = ({ product, setQuery }) => {
  const [searchParams] = useSearchParams();
  const { image, name, price, itemId, category } = product;

  if (!product) {
    return null;
  }

  return (
    <Link
      to={{
        pathname: `/${category}/${itemId}`,
        search: searchParams.toString(),
      }}
      onClick={() => {
        setQuery('');
      }}
      className={style.itemContainer}
    >
      <div className={style.imgWrapper}>
        <div className={style.itemImg}>
          <img
            src={image[0]}
            alt={`photo of ${name}`}
            className={style.mainImg}
          />
        </div>
        <div>
          <p>{name}</p>
          <Stars />
        </div>
      </div>
      <p>${price}</p>
    </Link>
  );
};
