import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load pages
const Home = React.lazy(() => import('@/pages/Home').then(module => ({ default: module.Home })));
const SignIn = React.lazy(() => import('@/pages/SignIn').then(module => ({ default: module.SignIn })));
const Play = React.lazy(() => import('@/pages/Play').then(module => ({ default: module.Play })));
const HallOfFame = React.lazy(() => import('@/pages/HallOfFame').then(module => ({ default: module.HallOfFame })));
const MyRecords = React.lazy(() => import('@/pages/MyRecords').then(module => ({ default: module.MyRecords })));
const NotFound = React.lazy(() => import('@/pages/NotFound').then(module => ({ default: module.NotFound })));

const PageLoader = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4">
        <Skeleton className="h-12 w-full max-w-lg rounded-lg" />
        <Skeleton className="h-128 w-3/4 max-w-lg rounded-lg" />
    </div>
);

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="play" element={<Play />} />
                    <Route path="hall-of-fame" element={<HallOfFame />} />
                    <Route path="my-records" element={<MyRecords />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
