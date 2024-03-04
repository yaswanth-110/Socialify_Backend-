import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home/Home";

import PostsLayout, { loader as postsLoader } from "./pages/PostsLayout";
import Posts from "./pages/PostsPage/Posts";
import PostDetail, {
  loader as singlePostLoader,
  action as deletePostAction,
} from "./pages/PostsPage/PostDetail";
import PostNew from "./components/Posts/PostNew";
import PostEdit from "./components/Posts/PostEdit";
import { action as manipulatePostAction } from "./components/Posts/PostForm";

import ProfileLayout, { loader as profileLoader } from "./pages/ProfileLayout";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";
import { action as editProfileAction } from "./components/Profile/ProfileEditForm";

import SearchLayout from "./pages/SearchLayout";
import ErrorPage from "./pages/Error";
import { action as logoutAction } from "./pages/Logout";
import PageStatusProvder from "./store/PageStatusProvder";
import ProfileProvder from "./store/ProfileProvider";
import Auth, { action as authAction } from "./pages/Auth";
import { checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: (
      <PageStatusProvder>
        <RootLayout />
      </PageStatusProvder>
    ),
    errorElement: <ErrorPage />,
    loader: checkAuthLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        id: "posts-root",
        element: <PostsLayout />,
        loader: postsLoader,
        children: [
          { index: true, element: <Posts /> },
          {
            path: ":postId",
            children: [
              {
                index: true,
                element: <PostDetail />,
                loader: singlePostLoader,
                action: deletePostAction,
              },
              { path: "edit", element: <PostEdit /> },
            ],
          },
          {
            path: "new",
            element: <PostNew />,
            action: manipulatePostAction,
          },
        ],
      },
      {
        path: "search",
        element: <SearchLayout />,
      },
      {
        path: "profile",
        element: (
          <>
            <ProfileProvder>
              <ProfileLayout />
            </ProfileProvder>
          </>
        ),
        id: "profile-root",
        loader: profileLoader,
        children: [
          { index: true, element: <Profile /> },
          { path: "edit", element: <ProfileEdit />, action: editProfileAction },
        ],
      },
      { path: "auth", element: <Auth />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
