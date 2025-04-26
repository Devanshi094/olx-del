// Correct useAuth.jsx
import { useContext } from "react";
import AuthContext from "./AuthContext";

// ✅ Correct default export
const useAuth = () => useContext(AuthContext);

export default useAuth;
