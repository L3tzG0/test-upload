import { useEffect } from 'react';
import { GamePage } from '@/pages/GamePage/GamePage';

export function App() {
  useEffect(() => {
    const title = import.meta.env.VITE_APP_TITLE;
    if (typeof title === 'string' && title.trim().length > 0) {
      document.title = title;
    }
  }, []);

  return <GamePage />;
}
