import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Header from '../components/Header';
import '../styles/custom.scss';

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex min-vh-100">
      <Header/>
        <main className="page-content container my-4 flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;