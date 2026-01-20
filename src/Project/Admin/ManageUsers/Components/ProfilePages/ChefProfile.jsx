import ProfileView from "./BaseProfile";
import { useLocation } from "react-router-dom";

export default function ChefProfile() {
  const location = useLocation();
  const chef = location.state?.userData;
  return (
    <>
      <ProfileView type="chef" data={chef} />
    </>
  );
}
