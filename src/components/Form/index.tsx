import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import clsx from 'clsx';
import { SpecialInput } from '@/components/UI/Input';
import Loader from '@/components/UI/Loader';
import { mockApiCall } from '@/components/api/auth';

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
  const digits = value.replace(/\D/g, '');

  if (!digits) return '';

  if (!digits.startsWith('375')) {
    return '+375';
  }

  const normalized = digits.slice(0, 12);

  const match = normalized.match(/^375(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);

  if (!match) return '+375';

  const [, code, part1, part2, part3] = match;

  return `+375${
    code ? ' ' + code : ''
  }${part1 ? ' ' + part1 : ''}${part2 ? ' ' + part2 : ''}${part3 ? ' ' + part3 : ''}`;
};

const RegistrationForm: React.FC = () => {
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(mockApiCall, {
    onSuccess: result => {
      if (result.success) {
        console.log('Успешная регистрация');
        setSubmitMessage({ type: 'success', text: result.message });
        reset();
      } else {
        console.log('Ошибка регистрации:', result.message);
        setSubmitMessage({ type: 'error', text: result.message });
      }
    },
    onError: error => {
      console.error('Критическая ошибка:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Произошла критическая ошибка. Попробуйте позже.',
      });
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    setSubmitMessage(null);
    console.log('Начало отправки формы:', data);

    mutation.mutate({
      phone: data.phone,
      password: data.password,
      agreeToTerms: data.agreeToTerms ?? false,
      agreeToPrivacy: data.agreeToPrivacy ?? false,
    });
  };

  return (
    <section className="form-section rounded-t-[24px] relative h-[426px] lg:h-full  px-[41px] flex flex-col items-center justify-center  glass-effect lg:min-h-screen z-10">
      <div className="form-section-content  z-10">
        <h2 className="text-left text-[22px] leading-[28px] text-white font-roboto-medium mb-[17px] lg:mb-[22px]">
          Регистрация
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-[8px]">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <SpecialInput
                  type="tel"
                  name="phone"
                  label="Номер телефона"
                  placeholder="+375"
                  value={field.value || ''}
                  onChange={e => {
                    const formatted = formatPhoneNumber(e.target.value);
                    field.onChange(formatted);
                  }}
                  error={errors.phone?.message}
                  maxLength={17}
                />
              )}
            />

            <SpecialInput
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
            <SpecialInput
              type="checkbox"
              name="agreeToTerms"
              label="Мне больше 21 года.<br> Я согласен и принимаю"
              linkText="«Правила приема ставок» и «Политику конциденциальности»"
              register={register}
              error={errors.agreeToTerms?.message}
            />

            <SpecialInput
              type="checkbox"
              name="agreeToPrivacy"
              label="Я принимаю участие и согласен с"
              linkText="условиями бонуса"
              register={register}
              error={errors.agreeToPrivacy?.message}
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className={clsx(
              'form-btn w-full text-[13px] h-[46px] uppercase py-[15px] px-[15px] rounded-md font-roboto-medium transition-colors',
              {
                'bg-btn-default text-white cursor-not-allowed':
                  mutation.isLoading,
                'bg-btn-default text-white hover:bg-btn-hover hover:shadow-btn-shadow-hover active:bg-btn-active':
                  !mutation.isLoading,
              }
            )}
          >
            {mutation.isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="-ml-1 mr-3" size="md" />
                Регистрация...
              </div>
            ) : (
              'регистрация'
            )}
          </button>

          {submitMessage && (
            <p
              className={clsx('mt-[22px] text-[13px]', {
                'text-white': submitMessage.type === 'success',
                'text-[#F91717]': submitMessage.type === 'error',
              })}
            >
              {submitMessage.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
