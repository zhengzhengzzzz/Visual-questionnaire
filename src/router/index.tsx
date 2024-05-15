import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound/NotFound";
import ManageLayout from "../Layouts/ManageLayout";
import List from "../pages/Manage/List";
import Star from "../pages/Manage/Star";
import Trash from "../pages/Manage/Trash";
import QuestionLayout from "../Layouts/QuestionLayout";
import { lazy } from "react";
// import Edit from ;
// import Stat from "../pages/Question/Stat";

// 路由懒加载 拆分bundle 优化首页体积
const Edit = lazy(
  () => import(/*webpackChunkName:"editPage"*/ "../pages/Question/Edit")
);
const Stat = lazy(
  () => import(/*webpackChunkName:"statPage"*/ "../pages/Question/Stat")
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);

export default router;

// 常用的路由常量
export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATNAME = "/manage/list";

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}
export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname))
    return true;
  return false;
}
