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
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes typing {
                    from { width: 0; }
                    to { width: 100%; }
                }
                @keyframes blink {
                    0%, 50% { border-color: transparent; }
                    51%, 100% { border-color: #10b981; }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .typing-container {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    border-right: 4px solid #10b981;
                    animation: typing 1.2s steps(12) 0.6s forwards, blink 0.7s step-end infinite;
                    width: 0;
                }
            `}</style>
            <h1 className="text-6xl font-black mb-6 tracking-tight">
                <span className="animate-fade-in-up inline-block" style={{ animationDelay: '0.1s' }}>
                    Make Your Impact
                </span>
                <br />
                <span className="text-emerald-500 bg-emerald-500/10 px-4 rounded-2xl inline-block mt-2">
                    <span className="typing-container">Effortlessly</span>
                </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mb-12 animate-fade-in" style={{ animationDelay: '2s' }}>
                Charity is a transparent and secure Zakat & Donation management system.
                Track your giving and see the change you bring.
            </p>
            <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '2.3s' }}>
                <Link to="/campaigns" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-600/20 hover:scale-105">
                    View Campaigns
                </Link>
                <Link to="/register" className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105">
                    Your Donations
                </Link>
            </div>
        </div>
    );
};

export default App;
