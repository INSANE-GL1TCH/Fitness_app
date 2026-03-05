import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/Forgotpassword';
import History from './pages/History';
import Exercises from './pages/Exercise';
import Profile from './pages/Profile';
import TrainerDashboard from './pages/TrainerDashboard';
import TrainerHistory from './pages/Trainerhistory'; 

// Components
import Header from './components/Header';
import Footer from './components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Layout with Header & Footer */}
        <Route element={<MainLayout />}>
          {/* User Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/exercise" element={<Exercises />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Trainer Routes */}
          
          <Route path="/trainerdash" element={<TrainerDashboard />} /> 
          <Route path="/trainer-history" element={<TrainerHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;