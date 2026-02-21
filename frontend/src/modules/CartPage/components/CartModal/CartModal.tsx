import { Button } from '../../../../shared/ui/Button';
import { useCart } from '../../../../store/CartContext';
import { IconId } from '../../../../types/icons';
import style from './CartModal.module.scss';
import ReactDom from 'react-dom';

type Props = {
  closeModal: () => void;
};

export const CartModal: React.FC<Props> = ({ closeModal }) => {
  const cart = useCart();

  return ReactDom.createPortal(
    <div className={style.backdrop} onClick={closeModal}>
      <div className={style.modalWrapper} onClick={e => e.stopPropagation()}>
        <Button
          className={style.buttonClose}
          onClick={closeModal}
          iconId={IconId.Close}
        />
        <span className={style.modalText}>
          Checkout is not implemented yet. <br /> Do you want to clear the Cart?
        </span>
        <div className={style.buttonContainer}>
          <Button type="large" title="Submit" onClick={cart.submitCart} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
