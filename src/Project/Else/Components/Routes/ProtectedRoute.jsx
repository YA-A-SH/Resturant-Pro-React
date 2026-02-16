import { useSelector } from "react-redux";
import ContLogin from "../Log/ContLogin";

export default function ProtectedRoute({ children }) {
  const goUser = useSelector((state) => state.google.user);
  const maUser = useSelector((state) => state.email.user);

  if (!goUser && !maUser) {
    return <ContLogin />;
  }

  return children;
}
