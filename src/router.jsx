import {createBrowserRouter } from 'react-router-dom';


import App from './App.jsx'
import LogInPage from './components/userAuth/logIn.jsx';
import SignUpPage from './components/userAuth/signUp.jsx';
import PrivateRoute from './components/userAuth/PrivateRoute.jsx';
import ProfilePicUploadPage from './components/userAuth/profilePicUpload.jsx';

export const router = createBrowserRouter([
    {
      path:'/',
      element: <PrivateRoute> <App /> </PrivateRoute>
      
    },
    {
      path:'/login',
      element: <LogInPage />
    },
    {
      path:'/signup',
      element: <SignUpPage />
    },
    {
      path:'/uploadprofilepic',
      element: <ProfilePicUploadPage />
    }
  
]);


