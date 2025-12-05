import React, { useEffect } from 'react';
import { AlertTriangle, X, Trash2, RotateCcw } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmă',
    cancelText = 'Anulează',
    variant = 'warning',
    isLoading = false
}) => {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isLoading) onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose, isLoading]);

    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            icon: <Trash2 className="text-red-500\" size={32} />,
            iconBg: 'bg-red-100',
            confirmBg: 'bg-red-500 hover:bg-red-600',
            border: 'border-red-200'
        },
        warning: {
            icon: <AlertTriangle className="text-amber-500" size={32} />,
            iconBg: 'bg-amber-100',
            confirmBg: 'bg-amber-500 hover:bg-amber-600',
            border: 'border-amber-200'
        },
        info: {
            icon: <RotateCcw className="text-blue-500" size={32} />,
            iconBg: 'bg-blue-100',
            confirmBg: 'bg-blue-500 hover:bg-blue-600',
            border: 'border-blue-200'
        }
    };

    const styles = variantStyles[variant];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={!isLoading ? onClose : undefined}
            />

            {/* Modal */}
            <div className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in border-2 ${styles.border}`}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-600 transition-colors disabled:opacity-50"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {styles.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-stone-800 text-center mb-2">
                    {title}
                </h3>

                {/* Message */}
                <p className="text-stone-600 text-center mb-6 whitespace-pre-line">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl transition-colors disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 px-4 py-3 ${styles.confirmBg} text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Se procesează...
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
