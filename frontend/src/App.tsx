import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
        <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 40px rgba(27, 94, 32, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#FFD700',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #F44336 0%, #E57373 100%)',
            },
          },
        }}
      />
      </div>
    </AuthProvider>
  );
}

export default App;
