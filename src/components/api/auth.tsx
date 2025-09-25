export interface RegistrationFormData {
  phone: string;
  password: string;
  agreeToTerms?: boolean;
  agreeToPrivacy?: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

const getRegisteredPhones = (): string[] => {
  const stored = localStorage.getItem('registeredPhones');
  return stored ? JSON.parse(stored) : [];
};

const saveRegisteredPhone = (phone: string): void => {
  const phones = getRegisteredPhones();
  phones.push(phone);
  localStorage.setItem('registeredPhones', JSON.stringify(phones));
};

export const mockApiCall = async (
  data: RegistrationFormData
): Promise<ApiResponse> => {
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
