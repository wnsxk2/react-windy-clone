import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <Button onClick={() => navigate('/jt')}>Go to JT</Button>
      <Button onClick={() => navigate('/hj')}>Go to HJ</Button>
    </div>
  );
}
