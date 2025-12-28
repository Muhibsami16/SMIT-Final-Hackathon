import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { LayoutDashboard, LayoutGrid, CheckCircle, Users, LogOut, User, HeartHandshake } from 'lucide-react';

const AdminSidebar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/campaigns', icon: LayoutGrid, label: 'Campaigns' },
        { path: '/admin/donations', icon: CheckCircle, label: 'Verifications' },
        { path: '/admin/donors', icon: Users, label: 'Donors' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40 shadow-sm">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <Link to="/" className="flex items-center gap-3">
                    <HeartHandshake className="w-8 h-8 text-emerald-600" />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Gravity</h1>
                        <p className="text-xs text-gray-500">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'

                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{userInfo?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{userInfo?.email}</p>
                    </div>
                </div>
                <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
