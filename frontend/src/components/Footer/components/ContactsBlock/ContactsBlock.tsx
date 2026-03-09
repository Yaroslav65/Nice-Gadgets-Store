import { useEffect, useRef, useState } from 'react';
import style from './ContactsBlock.module.scss';
import { LocationIcon, MailIcon, PhoneIcon } from './content';

export const ContactsBlock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={popupRef} className={style.wrapper}>
      <button
        type='button'
        className={style.trigger}
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-controls='contacts-popup'
        aria-haspopup='dialog'
      >
        Contacts
      </button>

      {isOpen && (
        <div id='contacts-popup' className={style.popup} role='dialog' aria-modal='false'>
          <p className={style.title}>Contact info</p>

          <div className={style.contactRow}>
            <div className={style.rowHeader}>
              <LocationIcon className={style.icon} />
              <span className={style.label}>Location</span>
            </div>
            <a
              className={style.link}
              href='https://www.google.com/maps/search/?api=1&query=Poland%2C%20Lodz'
              target='_blank'
              rel='noreferrer'
            >
              Poland, Lodz
            </a>
          </div>

          <div className={style.contactRow}>
            <div className={style.rowHeader}>
              <PhoneIcon className={style.icon} />
              <span className={style.label}>Phone</span>
            </div>
            <a className={style.link} href='tel:+48000000000'>
              +48 000 000 000
            </a>
          </div>

          <div className={style.contactRow}>
            <div className={style.rowHeader}>
              <MailIcon className={style.icon} />
              <span className={style.label}>Email</span>
            </div>
            <a className={style.link} href='mailto:yaroslav.halynskyi@gmail.com'>
              yaroslav.halynskyi@gmail.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
