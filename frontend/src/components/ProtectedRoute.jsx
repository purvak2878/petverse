import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

function ProtectedRoute({ children }) {

    const location = useLocation();

    if (!isLoggedIn()) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname,
                    message:
                        "Please login first to access this page."
                }}
            />
        );
    }

    return children;
}

export default ProtectedRoute;