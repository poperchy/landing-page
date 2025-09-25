import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '@/components/layout/Header';
import Hero from '@/components/Sections/Hero/Hero';
import RegistrationForm from '@/components/Sections/RegistrationForm';
import bg from '@/assets/images/bg.png';
import bgMobile from '@/assets/images/bg-mob2.png';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen wrapper bg-main flex flex-col items-center justify-center">
        <picture className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 z-[-1]">
          <source media="(max-width: 767px)" srcSet={bgMobile} />
          <source media="(min-width: 768px)" srcSet={bg} />
          <img
            src={bg}
            alt="bg"
            className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 z-[-1]"
          />
        </picture>
        <Header />
        <main className="min-h-screen flex items-center justify-between  flex-col w-full lg:flex-row">
          <Hero />
          <RegistrationForm />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
