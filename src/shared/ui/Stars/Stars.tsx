import { IconId } from '../../../types/icons';
import { Icons } from '../Icons';
import style from './Stars.module.scss';

export const Stars = () => {
  return (
    <div className={style.stars}>
      <Icons id={IconId.Star} className={style.star} />
      <Icons id={IconId.Star} className={style.star} />
      <Icons id={IconId.Star} className={style.star} />
      <Icons id={IconId.Star} className={style.star} />
      <Icons id={IconId.Star} className={style.star} />
    </div>
  );
};
