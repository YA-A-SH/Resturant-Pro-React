import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChefsContext } from "../../../../User/Context/MainContext";
import ProfileView from "./BaseProfile";
import EliteLoader from "./Loader";

export default function ChefProfile() {
  const location = useLocation();
  const chefId = location.state?.userData?.id;
  const { chefs } = useContext(ChefsContext);
  const navigate = useNavigate();

  const chef = chefs.find((c) => String(c.id) === String(chefId));

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!chef) navigate("/admin/manage-users", { replace: true });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [chef, navigate]);

  if (!chef) {
    return <EliteLoader color="#10B981" />;
  }

  return (
    <ProfileView
      type="chef"
      data={chef}
      state1={openEdit}
      state2={openDelete}
      setState1={setOpenEdit}
      setState2={setOpenDelete}
    />
  );
}
