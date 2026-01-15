import { useDispatch, useSelector } from "react-redux";
import PreUsers from "./PreUsers";
import { useTheme } from "@emotion/react";
import { useContext, useState } from "react";
import { ChefsContext } from "../../User/Context/MainContext";

export default function ContUsers() {
  const { users, loading, error } = useSelector((st) => st.users);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [selectedTap, setSelectedTap] = useState("Chef's");
  const dispatch = useDispatch();

  const managers = [
    {
      name: "Yaser",
      mail: "yasermail@gmail.com",
      city: "Rafah",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      age: "21",
    },
    {
      name: "عصملي",
      mail: "عصمليmail@gmail.com",
      city: "Rafah",
      img: "https://randomuser.me/api/portraits/men/24.jpg",
      age: "35",
    },
  ];

  const { chefs } = useContext(ChefsContext);

  return (
    <>
      <PreUsers
        isDark={isDark}
        users={users}
        loading={loading}
        error={error}
        selectedTap={selectedTap}
        setSelectedTap={setSelectedTap}
        dispatch={dispatch}
        managers={managers}
        chefs={chefs}
      />
    </>
  );
}
