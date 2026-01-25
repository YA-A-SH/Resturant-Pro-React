import { useDispatch, useSelector } from "react-redux";
import PreUsers from "./PreUsers";
import { useTheme } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import {
  ChefsContext,
  OpenSnackbarContext,
} from "../../User/Context/MainContext";
import { useTranslation } from "react-i18next";

export default function ContUsers() {
  // Hooks

  const { openSnackbar, setOpenSnackbar } = useContext(OpenSnackbarContext);
  const { chefs, setChefs } = useContext(ChefsContext);
  const [selectedTap, setSelectedTap] = useState(
    () => JSON.parse(localStorage.getItem("tap")) || "Manager's",
  );
  const [openAddChefComp, setOpenAddChefComp] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [chefSearch, setChefSearch] = useState([]);
  const [managerSearch, setManagerSearch] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const theme = useTheme();

  //  Selectors
  const { users, loading, error } = useSelector((st) => st.users);

  // Variables
  const isDark = theme.palette.mode === "dark";
  const managers = [
    {
      id: "1",
      name: "Yaser",
      mail: "yasermail@gmail.com",
      city: "Rafah",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      age: "21",
      income: [
        { month: "Jan", income: 10043 },
        { month: "Feb", income: 13955 },
        { month: "Mar", income: 22240 },
      ],
    },
    {
      id: "2",
      name: "عصملي",
      mail: "عصمليmail@gmail.com",
      city: "Rafah",
      img: "https://randomuser.me/api/portraits/men/24.jpg",
      age: "35",
      income: [
        { month: "Jan", incomes: 17043 },
        { month: "Feb", incomes: 8955 },
        { month: "Mar", incomes: 11240 },
      ],
    },
  ];
  const text = `${t("Search by")} ${selectedTap} ${t("name")}`;
  const ChefsShow = selectedTap === "Chef's" && isFiltered ? chefSearch : chefs;
  const ManagersShow =
    selectedTap === "Manager's" && isFiltered ? managerSearch : managers;
  const UsersShow = selectedTap === "User's" && isFiltered ? userSearch : users;

  // Effects

  useEffect(() => {
    document.title = t("Zeus | Admin => Manage User's");
  }, []);

  // Functions
  function handleSearch() {
    if (!searchText.trim()) {
      setIsFiltered(false);
      return;
    }

    if (selectedTap === "Chef's") {
      setChefSearch(
        chefs.filter((e) =>
          e.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    } else if (selectedTap === "Manager's") {
      setManagerSearch(
        managers.filter((e) =>
          e.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    } else if (selectedTap === "User's") {
      setUserSearch(
        users.filter((e) => {
          return e.name.toLowerCase().includes(searchText.toLowerCase());
        }),
      );
    }

    setIsFiltered(true);
  }
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <PreUsers
        t={t}
        isDark={isDark}
        theme={theme}
        loading={loading}
        error={error}
        text={text}
        ChefsShow={ChefsShow}
        ManagersShow={ManagersShow}
        UsersShow={UsersShow}
        searchText={searchText}
        selectedTap={selectedTap}
        dispatch={dispatch}
        chefs={chefs}
        chefSearch={chefSearch}
        openAddChefComp={openAddChefComp}
        handleSearch={handleSearch}
        setChefs={setChefs}
        setOpenAddChefComp={setOpenAddChefComp}
        setSearchText={setSearchText}
        setSelectedTap={setSelectedTap}
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </>
  );
}
