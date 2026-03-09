import style from './Button.module.scss';
import { Icons } from '../../ui/Icons/Icons';
import classNames from 'classnames';
import { ButtonProps } from '../../../types/buttons';

export const Button = ({
  iconId,
  directions,
  onClick,
  filled,
  type,
  className,
  disabled,
  title,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        style.button,
        type && style[type],
        className && className,
      )}
      disabled={disabled}
    >
      {title}
      <Icons id={iconId} directions={directions} filled={filled} />
    </button>
  );
};
