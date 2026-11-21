import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrandIntro } from './components/Brand';
import './styles.css';
import './mobile.css';

function Root() {
  const [ready, setReady] = useState(false);
  return (
    <StrictMode>
      {ready ? <App /> : <BrandIntro onComplete={() => setReady(true)} />}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
