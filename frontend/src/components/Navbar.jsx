import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { HeartHandshake, Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-emerald-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-emerald-600/20">
                            <HeartHandshake className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-gray-900">
                            Gravity
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className={`text-sm font-bold transition-colors ${isActive('/') ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/campaigns"
                            className={`text-sm font-bold transition-colors ${isActive('/campaigns') ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Campaigns
                        </Link>

                        {userInfo ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                                <Link
                                    to={userInfo.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/dashboard') || isActive('/admin/dashboard')
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
                                        }`}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gray-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-gray-900/10 hover:shadow-emerald-600/20"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl bg-gray-50 text-gray-900"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            to="/"
                            className="block px-3 py-4 rounded-xl text-base font-bold text-gray-900 hover:bg-gray-50"
                        >
                            Home
                        </Link>
                        <Link
                            to="/campaigns"
                            className="block px-3 py-4 rounded-xl text-base font-bold text-gray-900 hover:bg-gray-50"
                        >
                            Campaigns
                        </Link>
                        {userInfo ? (
                            <>
                                <Link
                                    to={userInfo.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                                    className="block px-3 py-4 rounded-xl text-base font-bold text-emerald-600 bg-emerald-50 mb-2"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className="w-full text-left px-3 py-4 rounded-xl text-base font-bold text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Link
                                    to="/login"
                                    className="block text-center px-4 py-3 rounded-xl text-base font-bold text-gray-900 bg-gray-50"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block text-center px-4 py-3 rounded-xl text-base font-bold text-white bg-gray-900"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
