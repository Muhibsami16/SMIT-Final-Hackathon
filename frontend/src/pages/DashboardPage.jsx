import { useSelector } from 'react-redux';
import { useGetMyDonationsQuery } from '../store/slices/donationsApiSlice';
import { Wallet, Clock, CheckCircle2, Download } from 'lucide-react';

const DashboardPage = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: donations, isLoading } = useGetMyDonationsQuery();

    const handleDownloadReceipt = async (donationId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/receipts/${donationId}/download`, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download receipt');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `receipt-${donationId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading receipt:', error);
            alert('Failed to download receipt. Please try again.');
        }
    };

    const totalDonated = donations?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
    const verifiedCount = donations?.filter(d => d.status === 'Verified').length || 0;
    const pendingCount = donations?.filter(d => d.status === 'Pending').length || 0;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <header className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, <span className="text-emerald-600">{userInfo.name}</span>
                </h1>
                <p className="text-gray-600 mt-1">Here is the overview of your contributions.</p>
            </header>

            {/* Stats Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Wallet className="text-emerald-600 w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Total Contributed</p>
                        <h3 className="text-2xl font-bold text-gray-900">PKR {totalDonated.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Verified Donations</p>
                        <h3 className="text-2xl font-bold text-gray-900">{verifiedCount}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Clock className="text-amber-600 w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Pending Verification</p>
                        <h3 className="text-2xl font-bold text-gray-900">{pendingCount}</h3>
                    </div>
                </div>
            </div>

            {/* Recent Donations */}
            <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Your Donation History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Campaign / Category</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {donations?.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No donations found. Start your journey of giving today.
                                    </td>
                                </tr>
                            ) : (
                                donations?.map((d) => (
                                    <tr key={d._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-gray-900 font-medium">{d.campaign?.title || 'General Donation'}</p>
                                            <p className="text-xs text-gray-500">{d.category}</p>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">PKR {d.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4"><span className="text-gray-500 text-sm">{d.donationType}</span></td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{new Date(d.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${d.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {d.status === 'Verified' && (
                                                <button
                                                    onClick={() => handleDownloadReceipt(d._id)}
                                                    className="text-emerald-600 hover:text-emerald-700 text-sm font-bold underline flex items-center gap-1 ml-auto"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
