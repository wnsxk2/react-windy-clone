import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const Home = lazy(() => import('../pages/index'));
const JT = lazy(() => import('../pages/jt'));
const HJ = lazy(() => import('../pages/hj'));

export default function RootRoute() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='jt' element={<JT />} />
      <Route path='hj' element={<HJ />} />
    </Routes>
  );
}
