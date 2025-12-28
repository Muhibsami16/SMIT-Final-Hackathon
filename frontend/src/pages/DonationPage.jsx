import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCreateDonationMutation } from '../store/slices/donationsApiSlice';
import { useGetCampaignsQuery } from '../store/slices/campaignsApiSlice';
import { CreditCard, Banknote, Landmark, HeartHandshake } from 'lucide-react';
import { toast } from 'react-hot-toast';
import SuccessModal from '../components/SuccessModal';

const DonationPage = () => {
    const [searchParams] = useSearchParams();
    const campaignIdFromUrl = searchParams.get('campaign');
    const navigate = useNavigate();

    const [amount, setAmount] = useState('');
    const [donationType, setDonationType] = useState('General');
    const [category, setCategory] = useState('General');
    const [paymentMethod, setPaymentMethod] = useState('Online');
    const [campaignId, setCampaignId] = useState(campaignIdFromUrl || '');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { data: campaigns, isLoading: campaignsLoading } = useGetCampaignsQuery();
    const [createDonation, { isLoading: isSubmitting }] = useCreateDonationMutation();

    useEffect(() => {
        if (campaignIdFromUrl && campaigns) {
            const campaign = campaigns.find(c => c._id === campaignIdFromUrl);
            if (campaign && campaign.status === 'Active') {
                setCampaignId(campaignIdFromUrl);
            } else if (campaign && campaign.status !== 'Active') {
                toast.error('This campaign is no longer active.');
                navigate('/donate'); // Clear URL param
            }
        }
    }, [campaignIdFromUrl, campaigns, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createDonation({
                amount: Number(amount),
                donationType,
                category,
                paymentMethod,
                campaignId: campaignId || null,
            }).unwrap();
            setShowSuccessModal(true);
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Submission failed');
        }
    };

    const types = ['Zakat', 'Sadqah', 'Fitra', 'General'];
    const categories = ['Food', 'Education', 'Medical', 'General'];
    const methods = [
        { id: 'Online', label: 'Online Payment', icon: CreditCard },
        { id: 'Bank', label: 'Bank Transfer', icon: Landmark },
        { id: 'Cash', label: 'Cash Donation', icon: Banknote },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex items-center justify-center">
            <div className="max-w-3xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Make a <span className="text-emerald-600">Donation</span></h1>
                    <p className="text-gray-500">Your contribution brings hope.</p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                    <div className="bg-emerald-600 p-8 text-white text-center">
                        <h2 className="text-2xl font-bold">Contribution Details</h2>
                        <p className="opacity-90 mt-1">Please fill in the details below to proceed.</p>
                    </div>

                    <form onSubmit={submitHandler} className="p-8 space-y-8">
                        {/* Amount Input */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Donation Amount (PKR)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-emerald-600">PKR</span>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    placeholder="0.00"
                                    className="w-full pl-20 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-2xl font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Type */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Donation Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {types.map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setDonationType(t)}
                                            className={`py-3 rounded-xl border text-sm font-bold transition-all ${donationType === t ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Support Category</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setCategory(c)}
                                            className={`py-3 rounded-xl border text-sm font-bold transition-all ${category === c ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Campaign Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Linked Campaign (Optional)</label>
                            <div className="relative">
                                <HeartHandshake className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                                <select
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-emerald-500 appearance-none font-medium"
                                    value={campaignId}
                                    onChange={(e) => setCampaignId(e.target.value)}
                                >
                                    <option value="">No specific campaign (General Fund)</option>
                                    {campaigns?.filter(c => c.status === 'Active').map(c => (
                                        <option key={c._id} value={c._id}>{c.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Payment Method</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {methods.map(m => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setPaymentMethod(m.id)}
                                        className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === m.id ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        <m.icon className={`w-8 h-8 ${paymentMethod === m.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                                        <span className="text-xs font-bold">{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xl rounded-2xl transition-all shadow-xl shadow-emerald-600/30 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing...' : 'Complete Contribution'}
                        </button>
                    </form>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate('/dashboard');
                }}
                title="Donation Submitted!"
                message="Your donation has been submitted successfully and is awaiting admin verification. You'll receive a receipt once it's verified."
            />
        </div>
    );
};

export default DonationPage;
