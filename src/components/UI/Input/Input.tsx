import React, { useState } from 'react';
import FlagIcon from './FlagIcon';

const DEFAULT_CLASSES = {
  input:
    'w-full h-[38px] px-3 py-[11px] px-[14px] border text-input-text bg-input-bg placeholder:text-input-placeholder placeholder:text-[13px]   border-input-border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#5AB828] caret-[#5AB828]',
  inputWithIcon: 'pr-10',
  checkbox:
    'w-[18px] h-[18px] appearance-none border-1 border-checkbox-border rounded bg-checkbox-bg cursor-pointer relative transition-all duration-200 ',
  label: 'block text-[13px] text-input-label mb-[2px] lg:mb-[4px]',
  checkboxLabel: 'text-checkbox-text cursor-pointer text-[11px] leading-[14px]',
  checkboxLink: 'underline hover:text-blue-500',
  error: 'mt-1 text-sm text-[#F91717]',
  passwordButton:
    'absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600',
  passwordIcon: 'h-5 w-5',
  checkboxContainer: 'flex items-center',
  checkboxInputContainer: 'flex items-center h-[18px]',
  checkboxLabelContainer: 'ml-[8px] text-sm leading-[1]',
};

interface InputProps {
  type: 'text' | 'email' | 'password' | 'tel' | 'checkbox';
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  error?: string;
  maxLength?: number;
  defaultChecked?: boolean;
  linkText?: string;
  linkHref?: string;
  className?: string;
  inputWithIcon?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  register,
  error,
  maxLength,
  defaultChecked = true,
  linkText,
  linkHref = '#',
  className = '',
  inputWithIcon = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputClassName = () => {
    const baseClass = DEFAULT_CLASSES.input;
    const iconClass = inputWithIcon ? DEFAULT_CLASSES.inputWithIcon : '';
    const errorClass = error ? 'border-[#F91717]' : '';
    return `${baseClass} ${iconClass} ${errorClass} ${className}`.trim();
  };

  if (type === 'checkbox') {
    return (
      <div className={DEFAULT_CLASSES.checkboxContainer}>
        <div className={DEFAULT_CLASSES.checkboxInputContainer}>
          <div className="relative h-[18px] w-[18px]">
            <input
              id={name}
              {...(register ? register(name) : {})}
              type="checkbox"
              defaultChecked={defaultChecked}
              className={`${DEFAULT_CLASSES.checkbox} ${className}`}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none h-[18px] w-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
              >
                <path
                  d="M1 4L4 7L9 1"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={DEFAULT_CLASSES.checkboxLabelContainer}>
          <label htmlFor={name} className={DEFAULT_CLASSES.checkboxLabel}>
            <span dangerouslySetInnerHTML={{ __html: label || '' }} />{' '}
            {linkText && (
              <a href={linkHref} className={DEFAULT_CLASSES.checkboxLink}>
                {linkText}
              </a>
            )}
          </label>
          {error && <p className={DEFAULT_CLASSES.error}>{error}</p>}
        </div>
      </div>
    );
  }

  if (type === 'password') {
    return (
      <div>
        {label && (
          <label htmlFor={name} className={DEFAULT_CLASSES.label}>
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={name}
            {...(register ? register(name) : {})}
            type={showPassword ? 'text' : 'password'}
            className={getInputClassName()}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={DEFAULT_CLASSES.passwordButton}
          >
            {showPassword ? (
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                className={DEFAULT_CLASSES.passwordIcon}
                stroke="currentColor"
                fill="none"
              >
                <path
                  d="M17.2068 7.56656C16.5701 6.78744 15.8568 6.07418 15.0777 5.4375L16.2589 4.25625C16.3335 4.17628 16.374 4.0705 16.3721 3.96121C16.3702 3.85191 16.3259 3.74763 16.2486 3.67034C16.1713 3.59304 16.067 3.54877 15.9577 3.54684C15.8484 3.54491 15.7427 3.58548 15.6627 3.66L14.4055 4.91437C13.0696 3.93562 11.3427 3.03563 9.42175 2.9175V1.07812C9.42175 0.966237 9.37731 0.858931 9.29819 0.779814C9.21907 0.700697 9.11177 0.65625 8.99988 0.65625C8.88799 0.65625 8.78068 0.700697 8.70157 0.779814C8.62245 0.858931 8.578 0.966237 8.578 1.07812V2.92031C6.65707 3.03844 4.92175 3.93844 3.59425 4.91719L2.33707 3.66281C2.29844 3.62136 2.25187 3.58812 2.20012 3.56506C2.14837 3.542 2.0925 3.5296 2.03586 3.5286C1.97921 3.52761 1.92295 3.53803 1.87042 3.55924C1.81789 3.58046 1.77017 3.61204 1.73011 3.6521C1.69005 3.69216 1.65846 3.73988 1.63725 3.79241C1.61603 3.84494 1.60561 3.90121 1.60661 3.95786C1.60761 4.0145 1.62001 4.07037 1.64306 4.12212C1.66612 4.17386 1.69937 4.22044 1.74082 4.25906L2.92207 5.44031C1.56644 6.67219 0.281128 7.72125 0.863316 8.16C0.951545 8.22882 1.06337 8.26005 1.17449 8.24688C1.28562 8.23371 1.38705 8.17722 1.45675 8.08969C1.4905 8.04469 4.9105 3.75 8.99988 3.75C13.0893 3.75 16.5093 8.04469 16.543 8.08969C16.6124 8.17771 16.7139 8.23456 16.8252 8.24775C16.9365 8.26094 17.0484 8.22937 17.1364 8.16C17.2245 8.09063 17.2813 7.98913 17.2945 7.87784C17.3077 7.76655 17.2761 7.65458 17.2068 7.56656Z"
                  fill="#777B8B"
                />
                <path
                  d="M8.99982 4.3125C4.35357 4.46156 4.35357 11.1975 8.99982 11.3438C13.6461 11.1947 13.6461 4.45875 8.99982 4.3125ZM8.99982 6.44438C8.63306 6.44512 8.28153 6.59114 8.02219 6.85049C7.76284 7.10983 7.61682 7.46136 7.61607 7.82812C7.61607 7.94001 7.57163 8.04732 7.49251 8.12644C7.41339 8.20555 7.30609 8.25 7.1942 8.25C7.08231 8.25 6.97501 8.20555 6.89589 8.12644C6.81677 8.04732 6.77232 7.94001 6.77232 7.82812C6.77307 7.23758 7.00799 6.67144 7.42557 6.25387C7.84314 5.83629 8.40928 5.60137 8.99982 5.60063C9.11171 5.60063 9.21902 5.64507 9.29814 5.72419C9.37725 5.80331 9.4217 5.91061 9.4217 6.0225C9.4217 6.13439 9.37725 6.24169 9.29814 6.32081C9.21902 6.39993 9.11171 6.44438 8.99982 6.44438Z"
                  fill="#777B8B"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="8"
                viewBox="0 0 18 8"
                className={DEFAULT_CLASSES.passwordIcon}
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M17.207 0.886514C17.2413 0.842931 17.2667 0.79301 17.2818 0.739601C17.2969 0.686191 17.3012 0.630339 17.2947 0.575233C17.2882 0.520127 17.2709 0.466847 17.2438 0.418435C17.2166 0.370022 17.1802 0.327425 17.1367 0.293076C17.0931 0.258727 17.0432 0.233299 16.9897 0.218243C16.9363 0.203187 16.8805 0.198799 16.8254 0.205328C16.7703 0.211857 16.717 0.229176 16.6686 0.256296C16.6202 0.283416 16.5776 0.319806 16.5432 0.363389C16.5095 0.408389 13.0895 4.70308 9.0001 4.70308C4.91072 4.70308 1.49072 0.408389 1.45697 0.363389C1.38727 0.275852 1.28583 0.219362 1.17471 0.206196C1.06359 0.19303 0.951763 0.224252 0.863534 0.293076C0.261659 0.734639 1.5751 1.7837 2.92228 3.01276L1.74103 4.19401C1.68344 4.25351 1.6445 4.32855 1.629 4.4099C1.6135 4.49124 1.62212 4.57535 1.6538 4.65185C1.68548 4.72836 1.73884 4.79394 1.8073 4.84052C1.87577 4.8871 1.95636 4.91264 2.03916 4.91401C2.28666 5.0012 3.40885 3.65964 3.59447 3.53589C4.93041 4.51464 6.65728 5.41464 8.57822 5.53276V7.37495C8.57822 7.48684 8.62267 7.59415 8.70179 7.67326C8.7809 7.75238 8.88821 7.79683 9.0001 7.79683C9.11198 7.79683 9.21929 7.75238 9.29841 7.67326C9.37752 7.59415 9.42197 7.48684 9.42197 7.37495V5.53276C11.3429 5.41464 13.0782 4.51464 14.4057 3.53589C14.5998 3.66808 15.7107 4.99839 15.961 4.91401C16.0438 4.91264 16.1244 4.8871 16.1929 4.84052C16.2614 4.79394 16.3147 4.72836 16.3464 4.65185C16.3781 4.57535 16.3867 4.49124 16.3712 4.4099C16.3557 4.32855 16.3168 4.25351 16.2592 4.19401L15.0779 3.01276C15.8569 2.37697 16.5702 1.66466 17.207 0.886514Z"
                  fill="#777B8B"
                />
              </svg>
            )}
          </button>
        </div>
        {error && <p className={DEFAULT_CLASSES.error}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label htmlFor={name} className={DEFAULT_CLASSES.label}>
          {label}
        </label>
      )}
      {type === 'tel' ? (
        <div className="relative">
          <div className="absolute left-[1px] w-[44px] h-[36px] flex items-center justify-center top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-[6px]">
            <FlagIcon />
          </div>
          <input
            id={name}
            {...(register ? register(name) : {})}
            type={type}
            value={value}
            onChange={onChange}
            className={`${getInputClassName()} pl-[60px]`}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        </div>
      ) : (
        <input
          id={name}
          {...(register ? register(name) : {})}
          type={type}
          value={value}
          onChange={onChange}
          className={getInputClassName()}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
      {error && <p className={DEFAULT_CLASSES.error}>{error}</p>}
    </div>
  );
};

export default Input;
