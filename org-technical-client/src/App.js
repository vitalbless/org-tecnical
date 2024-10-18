import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateRequestPage from './pages/CreateRequestPage';
import GenerateReportPage from './pages/GenerateReportPage';
import RequestsPage from './pages/ReguestsPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/create-request'
            element={
              <PrivateRoute>
                <CreateRequestPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/report'
            element={
              <PrivateRoute>
                <GenerateReportPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/requests'
            element={
              <PrivateRoute>
                <RequestsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
