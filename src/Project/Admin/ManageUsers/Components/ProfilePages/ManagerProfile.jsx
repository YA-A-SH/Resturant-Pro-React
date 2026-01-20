import { useLocation } from "react-router-dom";
import ProfileView from "./BaseProfile";

export default function ManagerProfile() {
  const location = useLocation();
  const manager = location.state?.userData;
  console.log("manager data in ManagerProfile:", manager);
  return (
    <>
      <ProfileView type="manager" data={manager} />
    </>
  );
}
