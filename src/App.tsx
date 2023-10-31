import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './common/Loader/Index';
import CanBo from './page/CanBo';
import Login from './page/Login';
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const storedLogin = sessionStorage.getItem("loginadmin");
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Router> {/* Bao bọc toàn bộ ứng dụng trong Router */}
      <Suspense fallback={<Loader />}>
        {loading ? (
          <Loader />
        ) : (
          <Routes>

            {storedLogin ? (
              <Route path="/" element={<DefaultLayout />} >

                <Route
                  path="/"
                  element={
                    <Suspense fallback={<Loader />}>
                      <CanBo />
                    </Suspense>
                  }
                />
              </Route>) : (
              <Route path='/' element={<Login />} />
            )}

          </Routes>
        )}
      </Suspense>
    </Router>
  );
}

export default App;
