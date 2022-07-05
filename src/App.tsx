import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SweetList from './components/Products/Sweets/SweetList';
import RecipeList from './components/Recipes/RecipeList';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastProvider } from 'react-toast-notifications';
import Orders from './components/Orders/Orders';
import ReportList from './components/Reports/ReportList';
import ModifyRecipe from './components/Recipes/ModifyRecipe';
import TrayList from './components/Products/Trays/TrayList';
import RewardList from './components/rewads/RewardList';
import Events from './components/Events/Events';
import UserRoleManagement from "./components/Users/UserRoleManagement";
import IngredientsList from "./components/Ingredients/IngredientList";

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
              <Route path="/admin/sweets" element={<SweetList />} />
              <Route path="/admin/ingredients" element={<IngredientsList />} />
              <Route path="/admin/trays" element={<TrayList />} />
              <Route path="/admin/rewards" element={<RewardList />} />
              <Route path="/admin/recipes" element={<RecipeList />} />
              <Route path="/admin/recipes/:id" element={<ModifyRecipe />} />
              <Route path="/admin/reports" element={<ReportList />} />
              <Route path="/admin/events" element={<Events />} />
              <Route path="/admin/users" element={<UserRoleManagement />} />
            </Routes>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
