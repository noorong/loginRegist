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
import { loginUser } from "../service/auth";

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
  console.log(db);
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
    <div>
      <h2>Login Page</h2>
      <LoginForm onSubmit={hadleSubmit} />
      <div>
        <ul>
          <li>
            <Link to="/">Back to home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function UserDetail() {
  const location = useLocation();
  const user = location.state.user;

  if (!user) return redirect("/login");
  const email = user.email;

  redirect("/detail");

  return (
    <div>
      <h2>UserDetail Page</h2>
      <div>
        <h3>User details</h3>
        <em>{email}</em>
      </div>
      <Link to="/login">Login</Link>
    </div>
  );
}

// location state를 지우는 헬퍼 함수입니다.
// function useEmptyLocationState() {
//   const location = useLocation();
//   location.state.user = "";
// }

function RegisterPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(db);
  const handleSubmit = (formData) => {
    const { email } = formData;
    const foundUser = db.users.find((user) => user.email === email);

    if (foundUser) return setError("이미 등록된 이메일 입니다.");

    db.users.push(formData);
    navigate("/login");
  };

  return (
    <div>
      <h2>Register Page</h2>
      <RegisterForm onSubmit={handleSubmit} />
      <div>
        <ul>
          <li>
            <Link to="/">Back to home</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <div>{error}</div>
    </div>
  );
}
