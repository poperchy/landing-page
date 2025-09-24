import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import Hero from './components/Hero/Hero';
import RegistrationForm from './components/RegistrationForm';
import bg from './assets/images/bg.png';

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
      <div
        className="min-h-screen wrapper bg-main flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Header />
        <main className="flex items-center justify-between  flex-col w-full lg:flex-row">
          <Hero />
          <RegistrationForm />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
