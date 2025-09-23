import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';

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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Hero />
          <RegistrationForm />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
