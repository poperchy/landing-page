import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/UI/Input';

const schema = yup.object({
  phone: yup
    .string()
    .matches(
      /^\+375\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
      'Введите корректный номер телефона'
    )
    .required('Телефон обязателен'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру'
    )
    .required('Пароль обязателен'),
  agreeToTerms: yup.boolean(),
  agreeToPrivacy: yup.boolean(),
});

type RegistrationFormData = yup.InferType<typeof schema>;

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/[^\d+]/g, '');

  if (!cleaned.startsWith('+')) {
    const digits = cleaned.replace(/\D/g, '');
    if (digits.length > 0) {
      return '+' + digits;
    }
    return '';
  }

  if (cleaned.startsWith('+')) {
    const digits = cleaned.slice(1).replace(/\D/g, '');

    if (digits.length === 0) return '';
    if (digits.length <= 3) return '+' + digits;
    if (digits.length <= 5)
      return '+' + digits.slice(0, 3) + ' ' + digits.slice(3);
    if (digits.length <= 8)
      return (
        '+' +
        digits.slice(0, 3) +
        ' ' +
        digits.slice(3, 5) +
        ' ' +
        digits.slice(5)
      );
    if (digits.length <= 10)
      return (
        '+' +
        digits.slice(0, 3) +
        ' ' +
        digits.slice(3, 5) +
        ' ' +
        digits.slice(5, 8) +
        ' ' +
        digits.slice(8)
      );
    if (digits.length <= 12)
      return (
        '+' +
        digits.slice(0, 3) +
        ' ' +
        digits.slice(3, 5) +
        ' ' +
        digits.slice(5, 8) +
        ' ' +
        digits.slice(8, 10) +
        ' ' +
        digits.slice(10)
      );

    return (
      '+' +
      digits.slice(0, 3) +
      ' ' +
      digits.slice(3, 5) +
      ' ' +
      digits.slice(5, 8) +
      ' ' +
      digits.slice(8, 10) +
      ' ' +
      digits.slice(10, 12)
    );
  }

  return cleaned;
};

const getRegisteredPhones = (): string[] => {
  const stored = localStorage.getItem('registeredPhones');
  return stored ? JSON.parse(stored) : [];
};

const saveRegisteredPhone = (phone: string): void => {
  const phones = getRegisteredPhones();
  phones.push(phone);
  localStorage.setItem('registeredPhones', JSON.stringify(phones));
};

const mockApiCall = async (
  data: RegistrationFormData
): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log('Отправка данных на API:', {
    phone: data.phone,
    password: '***',
    agreeToTerms: data.agreeToTerms,
    agreeToPrivacy: data.agreeToPrivacy,
    timestamp: new Date().toISOString(),
  });

  const normalizedPhone = data.phone.replace(/\D/g, '');
  const existingPhones = getRegisteredPhones();

  console.log(' Проверка номера:', {
    input: data.phone,
    normalized: normalizedPhone,
    existingCount: existingPhones.length,
  });

  if (Math.random() < 0.1) {
    console.log('Имитация ошибки сервера');
    return {
      success: false,
      message: 'Ошибка сервера. Попробуйте позже.',
    };
  }

  if (existingPhones.includes(normalizedPhone)) {
    console.log('Пользователь уже существует');
    return {
      success: false,
      message: 'Пользователь с таким номером телефона уже существует',
    };
  }

  console.log('Регистрация успешна');
  saveRegisteredPhone(normalizedPhone);

  return {
    success: true,
    message: `Регистрация успешно завершена! Добро пожаловать!`,
  };
};

const RegistrationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [phoneValue, setPhoneValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
    setValue('phone', formatted);
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    console.log('🚀 Начало отправки формы:', data);

    try {
      const result = await mockApiCall(data);

      if (result.success) {
        console.log('🎉 Успешная регистрация');
        setSubmitMessage({ type: 'success', text: result.message });
        reset();
        setPhoneValue(''); // Сбрасываем номер телефона
      } else {
        console.log('❌ Ошибка регистрации:', result.message);
        setSubmitMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('💥 Критическая ошибка:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Произошла критическая ошибка. Попробуйте позже.',
      });
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Завершение отправки формы');
    }
  };

  return (
    <section className="form-section rounded-t-[24px] relative h-[426px] lg:h-full  px-[41px] flex flex-col items-center justify-center  glass-effect lg:min-h-screen z-10">
      <div className="form-section-content  z-10">
        <h2 className="text-left text-[22px] leading-[28px] text-white font-roboto-medium mb-[17px] lg:mb-[22px]">
          Регистрация
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-[8px]">
            <Input
              type="tel"
              name="phone"
              label="Номер телефона"
              placeholder="+375"
              value={phoneValue}
              onChange={handlePhoneChange}
              error={errors.phone?.message}
              maxLength={17}
            />

            <Input
              type="password"
              name="password"
              label="Пароль"
              placeholder="Придумайте пароль"
              register={register}
              error={errors.password?.message}
              inputWithIcon={true}
            />
          </div>
          <div className="mt-[22px] mb-[22px] flex flex-col gap-[8px]">
            <Input
              type="checkbox"
              name="agreeToTerms"
              label="Мне больше 21 года.<br> Я согласен и принимаю"
              linkText="«Правила приема ставок» и «Политику конциденциальности»"
              register={register}
              error={errors.agreeToTerms?.message}
            />

            <Input
              type="checkbox"
              name="agreeToPrivacy"
              label="Я принимаю участие и согласен с"
              linkText="условиями бонуса"
              register={register}
              error={errors.agreeToPrivacy?.message}
            />
          </div>

          {submitMessage && (
            <div
              className={`p-4 rounded-md ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`form-btn w-full text-[13px] h-[46px] uppercase py-[15px] px-[15px] rounded-md font-roboto-medium transition-colors ${
              isSubmitting
                ? 'bg-btn-default text-white cursor-not-allowed'
                : 'bg-btn-default text-white hover:bg-btn-hover hover:shadow-btn-shadow-hover active:bg-btn-active'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Регистрация...
              </div>
            ) : (
              'регистрация'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
