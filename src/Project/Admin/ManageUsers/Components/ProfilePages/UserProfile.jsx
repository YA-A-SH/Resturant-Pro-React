import { useLocation } from "react-router-dom";
import ProfileView from "./BaseProfile";

export default function UserProfile() {
  const location = useLocation();
  const user = location.state?.userData;
  return (
    <>
      <ProfileView type="user" data={user} />
    </>
  );
}
