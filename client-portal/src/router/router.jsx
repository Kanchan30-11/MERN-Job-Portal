import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import PostJob from '../pages/PostJob';
import MyJobs from '../pages/MyJobs';
import EstimateSalary from '../pages/EstimateSalary';
import Update from '../pages/Update';
import Login from '../components/Login';
import JobDetails from '../pages/JobDetails';
import SignUp from '../components/SignUp';
import PrivateRoute from '../PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post-job',
        element: (
          <PrivateRoute>
            <PostJob />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-job',
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ),
      },
      {
        path: '/salary',
        element: (
          <PrivateRoute>
            <EstimateSalary />
          </PrivateRoute>
        ),
      },
      {
        path: '/edit-job/:id',
        element: (
          <PrivateRoute>
            <Update />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`),
      },
      {
        path: '/job/:id',
        element: <JobDetails />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
]);

export default router;
