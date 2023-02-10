/*
 * @Author: 卢天宇
 * @Date: 2023-02-10 20:51:50
 * @Description: 
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import ErrorPage from './error-pages';
import Contact, {
  loader as contactLoader
} from './routes/concat';

import Root, {
  loader as rootLoader,
  action as rootAction
} from './routes/root';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import EditContact, {
  action as editAction
} from "./routes/edit";
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    // element: <div>Hello World!</div>
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction, // * 当劫持到 Form 的请求触发
    loader: rootLoader, // * 一进来就会调用loader
    children: [
      {
        path: "/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader
      },
      {
        path: "/contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
