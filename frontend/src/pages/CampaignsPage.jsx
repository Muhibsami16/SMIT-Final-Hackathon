import { useGetCampaignsQuery } from '../store/slices/campaignsApiSlice';
import { Link } from 'react-router-dom';
import { Calendar, Target, TrendingUp } from 'lucide-react';

const CampaignsPage = () => {
    const { data: campaigns, isLoading, error } = useGetCampaignsQuery();

    if (isLoading) return <div className="pt-24 text-center">Loading Campaigns...</div>;
    if (error) return <div className="pt-24 text-center text-red-500">Error loading campaigns</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <header className="max-w-7xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
                    Active <span className="text-emerald-600">Campaigns</span>
                </h1>
                <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                    Every contribution, no matter the size, helps bring hope and change to those who need it most.
                </p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {campaigns.map((campaign) => {
                    const progress = Math.min((campaign.collectedAmount / campaign.goalAmount) * 100, 100);
                    const daysLeft = Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24));

                    return (
                        <div key={campaign._id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col group shadow-sm hover:shadow-xl hover:shadow-emerald-500/5">
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${campaign.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                        {campaign.status}
                                    </span>
                                    <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {daysLeft > 0 ? `${daysLeft} DAYS LEFT` : 'ENDED'}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                    {campaign.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-3 mb-8 leading-relaxed">
                                    {campaign.description}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                                        <span>Raised</span>
                                        <span className="text-emerald-600">{progress.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                                        <div
                                            className="bg-emerald-500 h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                                            style={{ width: `${progress}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-gray-900">PKR {campaign.collectedAmount.toLocaleString()}</span>
                                        <span className="text-gray-400">Goal: PKR {campaign.goalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <Link
                                    to={campaign.status === 'Active' ? `/donate?campaign=${campaign._id}` : '#'}
                                    className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${campaign.status === 'Active' ? 'bg-gray-900 hover:bg-emerald-600 text-white shadow-lg shadow-gray-900/10 hover:shadow-emerald-600/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                    {campaign.status === 'Active' ? 'Donate Now' : 'Campaign Ended'}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CampaignsPage;
