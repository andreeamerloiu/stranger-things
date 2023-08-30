import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Root from "./routes/Root";
import Home from "./routes/Home";
import Posts from "./routes/Posts";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import Login from "./routes/Login";
import ErrorPage from "/ErrorPage";
import NewPost from './components/NewPost';
import SendMessage from './components/SendMessage';
import SinglePost from '../components/SinglePost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <SinglePost />,
      },
      {
        path: "profile",
        element: <Profile />,
      },      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "newPost",
        element: <NewPost />,
      },
      {
        path: "sendMessage",
        element: <SendMessage />,
      },
      {
        path: "singlePost",
        element: <SinglePost />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} /> 
      {/* create router and pass the router to router provider */}
    </div>
  );
}

export default App;
