import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/Products/ProductList';
import RecipeList from './components/Recipes/RecipeList';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastProvider } from 'react-toast-notifications';
import Orders from './components/Orders/Orders';
import ReportList from './components/Reports/ReportList';
import ModifyRecipe from './components/Recipes/ModifyRecipe';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="wrapper transition duration-500 dark:bg-gray-600 h-screen bg-gray-50">
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/recipes" element={<RecipeList />} />
              <Route path="/admin/recipes/:id" element={<ModifyRecipe />} />
              <Route path="/admin/reports" element={<ReportList />} />
            </Routes>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
