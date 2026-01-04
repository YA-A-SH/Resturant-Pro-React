import { useSelector } from "react-redux";
import Login from "./Log/Login";
import ContLogin from "./Log/ContLogin";

export default function ProtectedRoute({ children }) {
  const faUser = useSelector((state) => state.facebook.user);
  const goUser = useSelector((state) => state.google.user);
  const maUser = useSelector((state) => state.email.user);

  if (!faUser && !goUser && !maUser) {
    return <ContLogin />;
  }
  return children;
}
