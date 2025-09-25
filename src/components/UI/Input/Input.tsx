import React from 'react';
import clsx from 'clsx';

const DEFAULT_CLASSES = {
  input:
    'w-full h-[38px] px-3 py-[11px] px-[14px] border text-input-text bg-input-bg placeholder:text-input-placeholder placeholder:text-[13px] border-input-border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#5AB828] caret-[#5AB828]',
  label: 'block text-[13px] text-input-label mb-[2px] lg:mb-[4px]',
  error: 'mt-1 text-sm text-[#F91717]',
};

interface InputProps {
  type: 'text' | 'email';
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  error?: string;
  maxLength?: number;
  className?: string;
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
  className = '',
}) => {
  const getInputClassName = () => {
    return clsx(
      DEFAULT_CLASSES.input,
      {
        'border-[#F91717]': error,
      },
      className
    );
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className={DEFAULT_CLASSES.label}>
          {label}
        </label>
      )}
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
      {error && <p className={DEFAULT_CLASSES.error}>{error}</p>}
    </div>
  );
};

export default Input;
