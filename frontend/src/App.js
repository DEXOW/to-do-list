import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/home';
import Login from './components/Login/login';
import Register from './components/Register/register';
import Dashboard from './components/Dashboard/dashboard';
import List from './components/List/list';

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/list', element: <List /> },
    { path: '*', element: <h1>404 Not Found</h1> }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
