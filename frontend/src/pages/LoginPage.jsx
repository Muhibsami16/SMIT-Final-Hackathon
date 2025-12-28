import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            const redirectPath = userInfo.role === 'admin' ? '/admin/dashboard' : '/dashboard';
            navigate(redirectPath);
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            // Redirect handled by useEffect above
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white border border-gray-200 rounded-3xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Sign in to continue your impact
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                                Email address
                            </label>
                            <input
                                type="email"
                                required
                                className="block w-full px-4 py-3 mt-1 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="block w-full px-4 py-3 pr-12 mt-1 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-4 flex justify-center items-center bg-gray-900 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-gray-900/10 hover:shadow-emerald-600/20 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div className="text-center text-sm">
                    <span className="text-gray-500">Don't have an account? </span>
                    <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-500">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
