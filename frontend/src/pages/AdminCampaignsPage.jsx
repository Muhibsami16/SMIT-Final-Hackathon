import { useState } from 'react';
import {
    useGetCampaignsQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useDeleteCampaignMutation,
} from '../store/slices/campaignsApiSlice';
import { Plus, Edit2, Trash2, Target, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminCampaignsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        goalAmount: '',
        deadline: '',
        status: 'Active',
    });

    const { data: campaigns, isLoading, error } = useGetCampaignsQuery();
    const [createCampaign] = useCreateCampaignMutation();
    const [updateCampaign] = useUpdateCampaignMutation();
    const [deleteCampaign] = useDeleteCampaignMutation();

    const handleOpenModal = (campaign = null) => {
        if (campaign) {
            setEditingCampaign(campaign);
            setFormData({
                title: campaign.title,
                description: campaign.description,
                goalAmount: campaign.goalAmount,
                deadline: campaign.deadline.split('T')[0],
                status: campaign.status,
            });
        } else {
            setEditingCampaign(null);
            setFormData({
                title: '',
                description: '',
                goalAmount: '',
                deadline: '',
                status: 'Active',
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCampaign) {
                await updateCampaign({ id: editingCampaign._id, ...formData }).unwrap();
                toast.success('Campaign updated');
            } else {
                await createCampaign(formData).unwrap();
                toast.success('Campaign created');
            }
            setShowModal(false);
        } catch (err) {
            toast.error(err?.data?.message || 'Action failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                await deleteCampaign(id).unwrap();
                toast.success('Campaign deleted');
            } catch (err) {
                toast.error(err?.data?.message || 'Delete failed');
            }
        }
    };

    return (
        <div className="pb-12 px-4 max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Campaign <span className="text-emerald-600">Center</span></h1>
                    <p className="text-gray-500">Design and launch high-impact donation drives.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20"
                >
                    <Plus className="w-5 h-5" /> New Campaign
                </button>
            </header>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 p-6 rounded-2xl text-red-600 text-center border border-red-100">
                    Error loading campaigns.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns?.map((campaign) => {
                        const progress = Math.min((campaign.collectedAmount / campaign.goalAmount) * 100, 100);
                        return (
                            <div key={campaign._id} className="group bg-white rounded-3xl p-6 border border-gray-200 hover:border-emerald-500/50 transition-all shadow-sm flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${campaign.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {campaign.status}
                                    </span>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleOpenModal(campaign)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(campaign._id)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{campaign.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 md:line-clamp-3">{campaign.description}</p>

                                <div className="space-y-4 mt-auto">
                                    <div>
                                        <div className="flex justify-between text-xs font-bold mb-2 text-gray-500 uppercase tracking-wider">
                                            <span>Progress</span>
                                            <span className="text-emerald-600">{progress.toFixed(0)}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                                                <Target className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase">Goal</span>
                                            </div>
                                            <p className="font-bold text-gray-900">PKR {campaign.goalAmount.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                                                <Calendar className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase">Ends</span>
                                            </div>
                                            <p className="font-bold text-gray-900">{new Date(campaign.deadline).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingCampaign ? 'Edit Campaign' : 'New Campaign'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wider">Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wider">Description</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 h-32 resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wider">Goal (PKR)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                        value={formData.goalAmount}
                                        onChange={(e) => setFormData({ ...formData, goalAmount: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wider">Deadline</label>
                                    <input
                                        type="date"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    />
                                </div>
                            </div>

                            {editingCampaign && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wider">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20"
                                >
                                    {editingCampaign ? 'Save Changes' : 'Create Campaign'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCampaignsPage;
