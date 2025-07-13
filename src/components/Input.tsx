import React, { InputHTMLAttributes, useState } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const iranPhoneRegex = /^09\d{9}$/;

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState('');
  const [localError, setLocalError] = useState<string | undefined>(undefined);

  const handleBlur = () => {
    setTouched(true);
    if (props.name === 'phone' && value && !iranPhoneRegex.test(value)) {
      setLocalError('شماره موبایل معتبر نیست');
    } else {
      setLocalError(undefined);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input + (localError || error ? ' ' + styles.error : '')}
        dir="ltr"
      />
      {(touched && (localError || error)) && (
        <span className={styles.errorText}>{localError || error}</span>
      )}
    </div>
  );
};

export default Input; 