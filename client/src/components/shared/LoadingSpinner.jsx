import { Droplet } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blood/20 border-t-blood rounded-full animate-spin"></div>
                <Droplet className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blood w-6 h-6 animate-pulse" />
            </div>
            <p className="mt-4 text-medical-navy font-medium animate-pulse">Syncing with LifeLink AI...</p>
        </div>
    );
};

export default LoadingSpinner;
