import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Home } from '@/pages/Home';
import { SignIn } from '@/pages/SignIn';
import { Play } from '@/pages/Play';
import { Ranking } from '@/pages/Ranking';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="play" element={<Play />} />
                <Route path="ranking" element={<Ranking />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
