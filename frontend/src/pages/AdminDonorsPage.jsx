import { useState } from 'react';
import { useGetUsersQuery } from '../store/slices/usersApiSlice';
import { Search, Mail, Phone, Calendar } from 'lucide-react';

const AdminDonorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: users, isLoading, error } = useGetUsersQuery(searchTerm);

    return (
        <div className="pb-12 px-4 max-w-7xl mx-auto">
            <header className="mb-8 md:flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Donor <span className="text-emerald-600">Database</span></h1>
                    <p className="text-gray-500">Manage registered users and view their history.</p>
                </div>

                <div className="relative mt-4 md:mt-0 w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-gray-900 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100">
                    Error loading donors. Please try again later.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users?.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-emerald-500/50 transition-all group shadow-sm hover:shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl font-black text-emerald-600">{user.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider">
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone className="w-4 h-4 text-emerald-600" />
                                    <span>{user.phone || 'Not provided'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 text-emerald-600" />
                                    <span>Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Donations</p>
                                    <p className="text-xl font-black text-gray-900">0</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</p>
                                    <p className="text-xl font-black text-gray-900">PKR 0</p>
                                </div>
                                <button className="px-4 py-2 bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 rounded-xl text-xs font-bold transition-all">
                                    View
                                </button>
                            </div>
                        </div>
                    ))}

                    {users?.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white border border-dashed border-gray-200 rounded-3xl">
                            <p className="text-gray-500">No donors found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDonorsPage;
