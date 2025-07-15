import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import  Login  from './pages/Login/Login.tsx'
import Posts from './pages/Posts/Posts.tsx';
import Post from './pages/Posts/components/Post.tsx';
import CreatePost from './pages/Posts/components/CreatePost.tsx';
import Users from './pages/Login/Users/Users.tsx';
import Home from './pages/Home/Home.tsx';
import './styles/global.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
  {
    path: "/createPost",
    element: <CreatePost />,  
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/home",
    element: <Home />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
