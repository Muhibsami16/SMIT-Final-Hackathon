import { Link } from 'react-router-dom';
import { useGetAdminStatsQuery } from '../store/slices/adminApiSlice';
import { useGetCampaignsQuery } from '../store/slices/campaignsApiSlice';
import { useVerifyDonationMutation, useGetAllDonationsQuery } from '../store/slices/donationsApiSlice';
import { Users, LayoutGrid, Heart, AlertCircle, RefreshCw, CheckCircle, ChevronRight } from 'lucide-react';

const AdminDashboardPage = () => {
    const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useGetAdminStatsQuery();
    const { data: campaigns, isLoading: campaignsLoading } = useGetCampaignsQuery();
    const { data: allDonations, isLoading: donationsLoading } = useGetAllDonationsQuery();

    const [verifyDonation, { isLoading: isVerifying }] = useVerifyDonationMutation();

    const handleVerify = async (id) => {
        if (window.confirm('Are you sure you want to verify this donation?')) {
            try {
                await verifyDonation(id).unwrap();
                alert('Donation verified successfully!');
                refetchStats();
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    if (statsLoading || campaignsLoading || donationsLoading) return <div className="pt-24 text-center">Loading Admin Panel...</div>;

    return (
        <div className="pb-12 px-4 max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">System <span className="text-emerald-600">Overview</span></h1>
                    <p className="text-gray-600">Manage donors, verify donations, and track campaigns.</p>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Link to="/admin/donations"><StatCard title="Total Donations" value={`PKR ${stats.totalDonationAmount.toLocaleString()}`} icon={Heart} color="text-emerald-500" bg="bg-emerald-500/10" /></Link>
                <Link to="/admin/donors"><StatCard title="Total Donors" value={stats.totalDonors} icon={Users} color="text-blue-500" bg="bg-blue-500/10" /></Link>
                <Link to="/admin/campaigns"><StatCard title="Active Campaigns" value={stats.activeCampaigns} icon={LayoutGrid} color="text-purple-500" bg="bg-purple-500/10" /></Link>
                <Link to="/admin/donations?status=Pending"><StatCard title="Pending Review" value={stats.pendingDonations} icon={AlertCircle} color="text-amber-500" bg="bg-amber-500/10" /></Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Campaign Progress */}
                <div className="bg-white rounded-3xl border border-gray-200 p-8 lg:col-span-1 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Campaign Progress</h2>
                        <Link to="/admin/campaigns" className="text-emerald-600 text-xs font-bold flex items-center gap-1 hover:underline">
                            View All <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-6">
                        {campaigns.slice(0, 5).map(c => {
                            const progress = Math.min((c.collectedAmount / c.goalAmount) * 100, 100);
                            return (
                                <div key={c._id} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold text-gray-700 truncate w-40">{c.title}</span>
                                        <span className="text-emerald-600 font-black">{progress.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Donation Manager Table */}
                <div className="bg-white rounded-3xl border border-gray-200 lg:col-span-2 overflow-hidden shadow-sm flex flex-col">
                    <div className="p-8 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-full">
                                {stats.pendingDonations} Pending
                            </span>
                            <Link to="/admin/donations" className="text-emerald-500 text-xs font-bold flex items-center gap-1 hover:underline">
                                View Full Table <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-bold">
                                <tr>
                                    <th className="px-6 py-4">Donor</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {allDonations.slice(0, 10).map((d) => (
                                    <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-gray-900 font-medium">{d.user?.name}</p>
                                            <p className="text-xs text-gray-500">{d.user?.email}</p>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">PKR {d.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-[10px] font-black uppercase">
                                            <span className={`px-2 py-1 rounded ${d.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {d.status === 'Pending' && (
                                                <button
                                                    onClick={() => handleVerify(d._id)}
                                                    disabled={isVerifying}
                                                    className="p-2 bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-lg transition-all"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color, bg }) => (
    <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm">
        <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 mt-1">{value}</h3>
    </div>
);

export default AdminDashboardPage;
