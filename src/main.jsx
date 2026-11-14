import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { AuthLayout } from './components/index.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import NotFound from './pages/NotFound.jsx'

// The editor (TinyMCE) is large, so these pages load only when needed
const AddPost = lazy(() => import('./pages/AddPost.jsx'))
const EditPost = lazy(() => import('./pages/EditPost.jsx'))

const Loading = () => <p className="py-10 text-center text-slate-500">Loading...</p>
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<Loading />}>
              <AddPost />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<Loading />}>
              <EditPost />
            </Suspense>
          </AuthLayout>
        ),
      },
      { path: '/post/:slug', element: <Post /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
