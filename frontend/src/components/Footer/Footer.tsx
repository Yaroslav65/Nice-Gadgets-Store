import { NavLink } from 'react-router-dom';
import style from './Footer.module.scss';
import { Directions, IconId } from '../../types/icons';
import { Button } from '../../shared/ui/Button';
import { useEffect, useRef, useState } from 'react';
import { ContactsBlock } from './components/ContactsBlock';
import { RightsBlock } from './components/RightsBlock';

export const Footer = () => {
  const [isFloating, setIsFloating] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) {
        return;
      }

      const footerTop = footerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (footerTop > windowHeight && scrollY > 300) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className={style.footer}>
      <div className={style.footerContent}>
        <NavLink className={style.link__item} to="/">
          <img
            src="./img/Logo.png"
            alt="logo-nice-gadgets"
            className={style.footerLogo}
          />
        </NavLink>

        <div className={style.footerList}>
          <NavLink
            className={style.link__item}
            to="https://github.com/Yaroslav65"
            target="_blank"
          >
            Github
          </NavLink>

          <ContactsBlock />

          <RightsBlock />
        </div>

        <div
          onClick={backToTop}
          className={`${style.buttonBack} ${isFloating ? style.floating : style.footerPosition}`}
        >
          Back to top
          <Button
            iconId={IconId.Chevron}
            directions={Directions.Up}
            className={style.button}
          />
        </div>
      </div>
    </footer>
  );
};
