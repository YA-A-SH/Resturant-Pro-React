import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileView from "./BaseProfile";
import { useEffect } from "react";
import EliteLoader from "./Loader";

export default function UserProfile() {
  const location = useLocation();
  const userId = location.state?.userData?.id;
  const user = useSelector((state) =>
    state.users.users.find((u) => u.id === userId),
  );
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) navigate("/admin/manage-users", { replace: true });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigate, user]);

  if (!user) {
    return <EliteLoader color="#23ec11" />;
  }

  return <ProfileView type="user" data={user} />;
}
