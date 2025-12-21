import { toast } from 'sonner';
import { Lightbulb, AlertCircle, CheckCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const ToastIcon = ({ type }: { type: ToastType }) => {
    switch (type) {
        case 'success':
            return <CheckCircle className="h-5 w-5 text-emerald-400" />;
        case 'error':
            return <AlertCircle className="h-5 w-5 text-rose-400" />;
        case 'warning':
            return <Lightbulb className="h-5 w-5 text-amber-400" />;
        case 'info':
        default:
            return <Info className="h-5 w-5 text-slate-300" />;
    }
};

const ToastBorderColor = (type: ToastType) => {
    switch (type) {
        case 'success':
            return 'border-emerald-500/30';
        case 'error':
            return 'border-rose-500/30';
        case 'warning':
            return 'border-amber-500/30';
        case 'info':
        default:
            return 'border-slate-500/30';
    }
};

const ToastBgColorIcon = (type: ToastType) => {
    switch (type) {
        case 'success':
            return 'bg-emerald-500/10';
        case 'error':
            return 'bg-rose-500/10';
        case 'warning':
            return 'bg-amber-500/10';
        case 'info':
        default:
            return 'bg-slate-500/10';
    }
};

const ToastTitleColor = (type: ToastType) => {
    switch (type) {
        case 'success':
            return 'text-emerald-400';
        case 'error':
            return 'text-rose-400';
        case 'warning':
            return 'text-amber-400';
        case 'info':
        default:
            return 'text-slate-200';
    }
}

export const customToast = (message: string, type: ToastType = 'info', title?: string) => {
    toast.custom((t) => (
        <div className={`bg-zinc-900 border ${ToastBorderColor(type)} text-white p-4 rounded-lg shadow-lg backdrop-blur-md w-full max-w-sm`}>
            <div className="flex items-start gap-3">
                <div className={`p-2 ${ToastBgColorIcon(type)} rounded-full shrink-0 mt-0.5`}>
                    <ToastIcon type={type} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className={`font-bold ${ToastTitleColor(type)}`}>
                        {title || (type.charAt(0).toUpperCase() + type.slice(1))}
                    </div>
                    <div className="text-sm text-zinc-400 break-words leading-relaxed mt-0.5">
                        {message}
                    </div>
                </div>
                <button
                    onClick={() => toast.dismiss(t)}
                    className="ml-auto text-zinc-500 hover:text-white transition-colors p-1"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    ), { duration: 3000 });
};

export const showToast = {
    success: (message: string, title: string = "성공") => customToast(message, 'success', title),
    error: (message: string, title: string = "오류") => customToast(message, 'error', title),
    warning: (message: string, title: string = "주의") => customToast(message, 'warning', title),
    info: (message: string, title: string = "알림") => customToast(message, 'info', title),
};
