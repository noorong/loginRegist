import { redirect, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const location = useLocation();

  return !!location.state.user ? children : redirect("/login");
}
