import ContLogin from "../Log/ContLogin";
import { useContext } from "react";
import { IsAdminContext } from "../Context/MainContext";

export default function AdminProtectedRoute({ children }) {
  const { isAdmin } = useContext(IsAdminContext);

  if (!isAdmin) {
    return <ContLogin />;
  }

  return children;
}
