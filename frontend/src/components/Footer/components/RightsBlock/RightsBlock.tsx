import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import style from './RightsBlock.module.scss';
import { Button } from '../../../../shared/ui/Button';
import { IconId } from '../../../../types/icons';

export const RightsBlock = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        type='button'
        className={style.trigger}
        onClick={() => setIsOpen(true)}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-controls='rights-modal'
      >
        Rights
      </button>

      {isOpen &&
        ReactDom.createPortal(
          <div className={style.backdrop} onClick={closeModal}>
            <div
              id='rights-modal'
              role='dialog'
              aria-modal='true'
              aria-labelledby='rights-modal-title'
              className={style.modal}
              onClick={event => event.stopPropagation()}
            >
              <Button
                className={style.closeButton}
                onClick={closeModal}
                iconId={IconId.Close}
              />

              <h3 id='rights-modal-title' className={style.title}>
                Rights & Ownership
              </h3>

              <p className={style.text}>
                This website and all original content are the intellectual
                property of Yaroslav Halynskyi and are protected by applicable
                copyright laws.
              </p>

              <p className={style.text}>
                Product names, logos, and trademarks belong to their respective
                owners and are used for identification purposes only.
              </p>

              <p className={style.text}>
                Any unauthorized copying, redistribution, or commercial use of
                materials from this website without written permission is
                prohibited.
              </p>

              <p className={style.copy}>
                © {new Date().getFullYear()} Yaroslav Halynskyi. All rights reserved.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
