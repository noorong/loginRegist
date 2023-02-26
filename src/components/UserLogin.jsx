import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./ReigsterForm";
import { db } from "../service/userData";
import { loginUser } from "../service/auth";

export default function UserLogin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<UserDetail />} />
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
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const email = searchParams.get("email");
  const password = searchParams.get("password");

  if (!email || !password) navigate("/login");

  return (
    <div>
      <h2>UserDetail Page</h2>
      <p>
        <h3>User details</h3>
        <em>{email}</em>
        <br />
        <strong>{password}</strong>
      </p>
      <Link to="/login">Login</Link>
    </div>
  );
}

function RegisterPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    console.log("유저를 등록하세요.");
    const { email } = formData;
    const foundUser = db.find((user) => user.email === email);

    if (foundUser) return setError("이미 등록된 이메일 입니다.");

    db.push(formData);
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