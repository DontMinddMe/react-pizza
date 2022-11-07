import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElemet = document.getElementById('root');

if (rootElemet) {
  const root = ReactDOM.createRoot(rootElemet);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
