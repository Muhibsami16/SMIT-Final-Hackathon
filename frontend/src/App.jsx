import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PrivateRoute, { AdminRoute } from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CampaignsPage from './pages/CampaignsPage';
import DonationPage from './pages/DonationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDonorsPage from './pages/AdminDonorsPage';
import AdminDonationsPage from './pages/AdminDonationsPage';
import AdminCampaignsPage from './pages/AdminCampaignsPage';
import AdminLayout from './components/AdminLayout';
import { Link } from 'react-router-dom';

function AppContent() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';


    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-emerald-500/30 selection:text-emerald-500">
            <Toaster position="top-center" reverseOrder={false} />
            {!isAdminRoute && !isAuthPage && <Navbar />}
            <main className="min-h-screen">
                <Routes>
                    <Route path="/" element={<HeroSection />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/campaigns" element={<CampaignsPage />} />

                    {/* Authenticated Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/donate" element={<DonationPage />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route element={<AdminRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                            <Route path="/admin/donors" element={<AdminDonorsPage />} />
                            <Route path="/admin/donations" element={<AdminDonationsPage />} />
                            <Route path="/admin/campaigns" element={<AdminCampaignsPage />} />
                        </Route>
                    </Route>
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-6xl font-black mb-6 tracking-tight">
                Make Your Impact <br />
                <span className="text-emerald-500 bg-emerald-500/10 px-4 rounded-2xl">Effortlessly</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mb-12">
                Gravity is a transparent and secure Zakat & Donation management system.
                Track your giving and see the change you bring.
            </p>
            <div className="flex gap-4">
                <Link to="/campaigns" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-600/20">
                    View Campaigns
                </Link>
                <Link to="/register" className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
                    Your Donations
                </Link>
            </div>
        </div>
    );
};

export default App;
