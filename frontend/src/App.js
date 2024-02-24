import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/home';
import Login from './components/Login/login';
import Register from './components/Register/register';

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register />}
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
