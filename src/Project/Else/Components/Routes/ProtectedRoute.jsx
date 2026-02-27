import { useSelector } from "react-redux";
import ContLogin from "../Log/ContLogin";
import { selectCurrentUser } from "@user/RTK/LogSlice";

export default function ProtectedRoute({ children }) {
  const user = useSelector(selectCurrentUser);
  if (!user) {
    return <ContLogin />;
  }

  return children;
}
