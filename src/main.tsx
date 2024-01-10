import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UsersPage from './pages/UsersPage.tsx'
import SideBar from './components/SideBar/SideBar.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import MyProfile from './components/Profile/MyProfile.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: [<App/>, <SideBar/>],
    children: [
      {
        path: "my-profile",
        element: <MyProfile/>,
      },
      {
        path: "users",
        element: <UsersPage/>,
      },
      {
        path: "users/profile/:id",
        element: <ProfilePage/>
      }
    ],
  },
  {
    path: "/auth",
    element: <LoginPage/>
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
