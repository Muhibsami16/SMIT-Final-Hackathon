import { useState } from 'react';
import {
    useGetAllDonationsQuery,
    useVerifyDonationMutation,
} from '../store/slices/donationsApiSlice';
import { Filter, CheckCircle, Clock, Download, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDonationsPage = () => {
    const [filters, setFilters] = useState({
        type: '',
        status: '',
        search: ''
    });

    const { data: donations, isLoading, error } = useGetAllDonationsQuery(filters);
    const [verifyDonation, { isLoading: isVerifying }] = useVerifyDonationMutation();

    const handleVerify = async (id) => {
        try {
            await verifyDonation(id).unwrap();
            toast.success('Donation verified successfully');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to verify donation');
        }
    };

    return (
        <div className="pb-12 px-4 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Donation <span className="text-emerald-600">Audit</span></h1>
                <p className="text-gray-500">Verify and manage incoming donations.</p>
            </header>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-emerald-600">
                    <Filter className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-wider text-sm">Filter Transactions</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            placeholder="Search donor..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <select
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                        <option value="">All Types</option>
                        <option value="Zakat">Zakat</option>
                        <option value="Sadqah">Sadqah</option>
                        <option value="Fitra">Fitra</option>
                        <option value="General">General</option>
                    </select>

                    <select
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 p-6 rounded-2xl text-red-600 text-center border border-red-100">
                    Error loading donations.
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-gray-500 uppercase text-xs font-bold tracking-widest px-6">
                                    <th className="pb-4 pt-4 px-6">Donor</th>
                                    <th className="pb-4 pt-4 px-6">Type / Category</th>
                                    <th className="pb-4 pt-4 px-6">Amount</th>
                                    <th className="pb-4 pt-4 px-6">Status</th>
                                    <th className="pb-4 pt-4 px-6">Date</th>
                                    <th className="pb-4 pt-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {donations?.map((donation) => (
                                    <tr
                                        key={donation._id}
                                        className="hover:bg-gray-50 transition-all group"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-gray-900">
                                                {donation.user?.name}
                                            </div>
                                            <div className="text-xs text-gray-500">{donation.user?.email}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-gray-900 font-medium">{donation.donationType}</div>
                                            <div className="text-xs text-gray-500">{donation.category}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-emerald-600 font-black text-lg">
                                                PKR {donation.amount?.toLocaleString()}
                                            </div>
                                            <div className="text-[10px] text-gray-400 uppercase tracking-tighter">
                                                via {donation.paymentMethod}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {donation.status === 'Verified' ? (
                                                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold font-sans">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-gray-500 text-sm">
                                            {new Date(donation.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            {donation.status === 'Pending' && (
                                                <button
                                                    onClick={() => handleVerify(donation._id)}
                                                    disabled={isVerifying}
                                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-600/10"
                                                >
                                                    Verify
                                                </button>
                                            )}
                                            {donation.status === 'Verified' && (
                                                <button className="text-gray-400 hover:text-emerald-600 transition-colors">
                                                    <Download className="w-5 h-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {donations?.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                No donation records found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDonationsPage;
