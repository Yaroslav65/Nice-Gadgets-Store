type IconProps = {
  className?: string;
};

export const LocationIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      aria-hidden='true'
    >
      <path
        d='M12 21c-4.35-4.05-6.5-7.2-6.5-10A6.5 6.5 0 1 1 18.5 11c0 2.8-2.15 5.95-6.5 10Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M12 13.5A2.5 2.5 0 1 0 12 8.5a2.5 2.5 0 0 0 0 5Z' />
    </svg>
  );
};

export const PhoneIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      aria-hidden='true'
    >
      <path
        d='M22 16.92V20a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 6.18 2 2 0 0 1 5 4h3.09a2 2 0 0 1 2 1.72c.12.9.35 1.78.68 2.62a2 2 0 0 1-.45 2.11L9.1 11.67a16 16 0 0 0 3.23 3.23l1.22-1.22a2 2 0 0 1 2.11-.45c.84.33 1.72.56 2.62.68A2 2 0 0 1 22 16.92Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const MailIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      aria-hidden='true'
    >
      <rect x='3' y='6' width='18' height='12' rx='2' />
      <path d='m4.5 7.5 7.5 5.5 7.5-5.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};
