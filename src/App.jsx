import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './servis/authService/authService';
import { Layout } from './pages/Layout/Layout';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='users-page' element={<UsersPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
