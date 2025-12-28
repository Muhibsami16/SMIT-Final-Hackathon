import { CheckCircle2, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
                <div className="p-8 space-y-6 text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-black text-gray-900">{title}</h3>
                        <p className="text-gray-500 leading-relaxed">{message}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-600/20 transition-all"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
