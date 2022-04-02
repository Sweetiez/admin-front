import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/Products/ProductList';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="wrapper transition duration-500 dark:bg-gray-600 h-screen bg-gray-50">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
