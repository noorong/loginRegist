import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  redirect,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./ReigsterForm";
import PrivateRoute from "./PrivateRouting";
import { db } from "../service/userData";
import { loginUser, registerUser } from "../service/auth";

function PageLayout({ heading, links, children }) {
  return (
    <div>
      <h2>{heading}</h2>
      <nav>
        {links.map(({ to, text }) => (
          <li>
            <Link to={to}>{text}</Link>
          </li>
        ))}
      </nav>

      <main>{children}</main>
    </div>
  );
}

export default function UserLogin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/detail"
          element={
            <PrivateRoute>
              <UserDetail />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div>
      <h2>Home Page</h2>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

function LoginPage() {
  console.log(db);
  const navigate = useNavigate();

  const hadleSubmit = (formData) => {
    const foundUser = loginUser(formData);

    if (!foundUser) return;

    const locationObject = {
      state: { user: foundUser },
    };

    navigate("/detail", locationObject);
  };
  return (
    <PageLayout
      heading="login"
      links={[
        { to: "/register", text: "Register" },
        { to: "/", text: "Home" },
      ]}
    >
      <LoginForm onSubmit={hadleSubmit} />
    </PageLayout>
  );
}

function UserDetail() {
  const location = useLocation();
  const user = location.state.user;

  if (!user) return redirect("/login");
  const email = user.email;

  redirect("/detail");

  return (
    <PageLayout
      heading="User Detail"
      links={[{ to: "/login", text: "Logout" }]}
    >
      <div>
        <em>email : {email}</em>
      </div>
    </PageLayout>
  );
}

// location state를 지우는 헬퍼 함수입니다.
// function useEmptyLocationState() {
//   const location = useLocation();
//   location.state.user = "";
// }

function RegisterPage() {
  const navigate = useNavigate();
  const handleSubmit = (formData) => {
    registerUser(formData);
    navigate("/login");
  };

  return (
    <PageLayout
      heading="Register"
      links={[
        { to: "/login", text: "login" },
        { to: "/", text: "Home" },
      ]}
    >
      <RegisterForm onSubmit={handleSubmit} />
    </PageLayout>
  );
}
