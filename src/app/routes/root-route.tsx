import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const Home = lazy(() => import('@/app/pages/index'));
const JT = lazy(() => import('@/app/pages/jt'));
const HJ = lazy(() => import('@/app/pages/hj'));

export default function RootRoute() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='jt' element={<JT />} />
      <Route path='hj' element={<HJ />} />
    </Routes>
  );
}
