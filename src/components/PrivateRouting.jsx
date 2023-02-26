import { Route, redirect, useLocation } from "react-router-dom";

export default function PrivateRoute({ children, ...props }) {
  const location = useLocation();
  console.log(props);
  return (
    <Route
      {...props}
      render={() => {
        // location.state가 없으면, /login 페이지로 이동합니다.
        const isLoggedIn = !!location.state.user;

        if (!isLoggedIn) {
          return redirect("/login");
        }

        return children;
      }}
    />
  );
}
