import {createBrowserRouter } from 'react-router-dom';


import App from './App.jsx'
import LogInPage from './components/userAuth/logIn.jsx';
import SignUpPage from './components/userAuth/signIn.jsx';

export const router = createBrowserRouter([
    {
      path:'/',
      element: <App />
    },
    {
      path:'/login',
      element: <LogInPage />
    },
    {
      path:'/signup',
      element: <SignUpPage />
    }
  
]);


