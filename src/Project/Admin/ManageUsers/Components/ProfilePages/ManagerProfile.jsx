import { useLocation } from "react-router-dom";
import ProfileView from "./BaseProfile";

export default function ManagerProfile() {
  const location = useLocation();
  const manager = location.state?.userData;
  return (
    <>
      <ProfileView type="manager" data={manager} />
    </>
  );
}
