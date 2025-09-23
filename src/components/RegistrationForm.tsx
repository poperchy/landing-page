import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'Необходимо согласиться с условиями'),
  agreeToPrivacy: yup
    .boolean()
    .oneOf([true], 'Необходимо согласиться с политикой конфиденциальности'),
});

type RegistrationFormData = yup.InferType<typeof schema>;

// Функция для форматирования номера телефона
const formatPhoneNumber = (value: string): string => {
  // Удаляем все нецифровые символы кроме +
  const cleaned = value.replace(/[^\d+]/g, '');

  // Если номер не начинается с +, добавляем его
  if (!cleaned.startsWith('+')) {
    const digits = cleaned.replace(/\D/g, '');
    if (digits.length > 0) {
      return '+' + digits;
    }
    return '';
  }

  // Если номер начинается с +, форматируем его
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

    // Ограничиваем до 12 цифр после +
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

// Функции для работы с localStorage
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
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log('Отправка данных на API:', {
    phone: data.phone,
    password: '***', // Не логируем пароль
    agreeToTerms: data.agreeToTerms,
    agreeToPrivacy: data.agreeToPrivacy,
    timestamp: new Date().toISOString(),
  });

  // Имитация проверки существующего пользователя
  const normalizedPhone = data.phone.replace(/\D/g, '');
  const existingPhones = getRegisteredPhones();

  console.log(' Проверка номера:', {
    input: data.phone,
    normalized: normalizedPhone,
    existingCount: existingPhones.length,
  });

  // Имитация ошибки API (10% вероятность)
  if (Math.random() < 0.1) {
    console.log('Имитация ошибки сервера');
    return {
      success: false,
      message: 'Ошибка сервера. Попробуйте позже.',
    };
  }

  // Проверка существующего пользователя
  if (existingPhones.includes(normalizedPhone)) {
    console.log('Пользователь уже существует');
    return {
      success: false,
      message: 'Пользователь с таким номером телефона уже существует',
    };
  }

  // Имитация успешной регистрации
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
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
  });

  // Обработчик изменения номера телефона
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Регистрация</h2>
          <p className="text-lg text-gray-600 mb-4">
            Создайте аккаунт для доступа к нашим услугам
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Номер телефона
              </label>
              <input
                type="tel"
                value={phoneValue}
                onChange={handlePhoneChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+375"
                maxLength={17} // Максимальная длина с пробелами
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Пароль
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Придумайте пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('agreeToTerms')}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-700">
                    Я согласен с{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      условиями использования
                    </a>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.agreeToTerms.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('agreeToPrivacy')}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToPrivacy" className="text-gray-700">
                    Я согласен с{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      политикой конфиденциальности
                    </a>
                  </label>
                  {errors.agreeToPrivacy && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.agreeToPrivacy.message}
                    </p>
                  )}
                </div>
              </div>
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
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                'Зарегистрироваться'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
