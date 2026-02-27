import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Fade,
  Stack,
} from "@mui/material";
import CardBase from "./CardsBase";
import CardBaseSkeleton from "./CardBaseSkeleton";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectUserData,
  selectUserError,
  selectUserLoading,
} from "@user/RTK/ElseSlice";
import { useTranslation } from "react-i18next";
import {
  ChefsContext,
  SelectedTapAdmin,
} from "@else/Components/Context/MainContext";

const MANAGERS_DATA = [
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

const CardsToShowAndTaps = React.memo(({ searchText }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { selectedTap, setSelectedTap } = useContext(SelectedTapAdmin);
  const { chefs } = useContext(ChefsContext);

  const isDark = theme.palette.mode === "dark";

  // Redux
  const users = useSelector(selectUserData);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const filteredData = useMemo(() => {
    const query = searchText.toLowerCase().trim();

    if (selectedTap === "Chef's") {
      return query
        ? chefs.filter((c) => c.name.toLowerCase().includes(query))
        : chefs;
    }
    if (selectedTap === "Manager's") {
      return query
        ? MANAGERS_DATA.filter((m) => m.name.toLowerCase().includes(query))
        : MANAGERS_DATA;
    }
    if (selectedTap === "User's") {
      return query
        ? users.filter((u) => u.name.toLowerCase().includes(query))
        : users;
    }
    return [];
  }, [searchText, selectedTap, chefs, users]);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const totalPages = Math.ceil(filteredData?.length / cardsPerPage);
  const startCard = (currentPage - 1) * cardsPerPage;
  const dataToShow = filteredData?.slice(startCard, startCard + cardsPerPage);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [selectedTap, searchText]);

  useEffect(() => {
    localStorage.setItem("tap", JSON.stringify(selectedTap));
  }, [selectedTap]);

  const tabs = [
    { id: "Manager's", label: t("Managers"), color: "#7a61f3" },
    { id: "Chef's", label: t("Master Chefs"), color: "#0dae7a" },
    { id: "User's", label: t("Community"), color: "#e78a09" },
  ];

  const paginationButtons = () => {
    let buttons = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    } else {
      if (currentPage <= 2) buttons = [1, 2, 3, "...", totalPages];
      else if (currentPage >= totalPages - 2)
        buttons = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      else
        buttons = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
    }
    return buttons;
  };

  return (
    <>
      {/* --- Taps Bar --- */}
      <Box
        sx={{
          width: { xxs: "100%", sm: "fit-content" },
          m: "0 auto 60px auto",
          p: 1,
          borderRadius: "100px",
          bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
          boxShadow: isDark
            ? "0 20px 40px rgba(0,0,0,0.2)"
            : "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = selectedTap === tab.id;
          return (
            <Button
              key={tab.id}
              onClick={() => setSelectedTap(tab.id)}
              disableRipple
              sx={{
                borderRadius: "100px",
                px: { xxs: 3, sm: 6 },
                py: 1.5,
                fontWeight: 800,
                fontSize: "0.9rem",
                textTransform: "capitalize",
                transition: "all 0.4s",
                background: isActive ? tab.color : "transparent",
                color: isActive ? "#fff" : "text.secondary",
                boxShadow: isActive ? `0 10px 20px ${tab.color}40` : "none",
                "&:hover": {
                  bgcolor: isActive
                    ? tab.color
                    : isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                  transform: isActive ? "scale(1.05)" : "none",
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Box>

      {/* --- Cards Grid --- */}
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Loading State for Users */}
        {selectedTap === "User's" &&
          loading &&
          [...Array(8)].map((_, i) => (
            <Grid item xxs={12} sm={6} md={4} lg={3} key={i}>
              <CardBaseSkeleton isDark={isDark} />
            </Grid>
          ))}

        {/* Error State */}
        {selectedTap === "User's" && error && (
          <Box sx={{ width: "100%", textAlign: "center", mt: 10 }}>
            <Typography color="error" variant="h4" fontWeight={900}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Display Data (Managers, Chefs, or Users) */}
        {!loading &&
          !error &&
          dataToShow.map((item, index) => (
            <Fade in timeout={500 + index * 50} key={item.id || index}>
              <Grid item xxs={12} sm={6} md={4} lg={3}>
                <CardBase
                  data={item}
                  id={
                    selectedTap === "Manager's"
                      ? "manager"
                      : selectedTap === "Chef's"
                        ? "chef"
                        : "user"
                  }
                  chefId={item.id}
                />
              </Grid>
            </Fade>
          ))}

        {/* No Results Message */}
        {!loading && dataToShow.length === 0 && (
          <Typography variant="h6" sx={{ mt: 5, opacity: 0.5 }}>
            {t("No results found")}
          </Typography>
        )}
      </Grid>

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <Stack
          direction="row"
          spacing={1.2}
          justifyContent="center"
          alignItems="center"
          mt={8}
          mb={4}
        >
          {paginationButtons().map((btn, idx) => {
            const isActive = currentPage === btn;
            const isEllipsis = btn === "...";
            return (
              <Button
                key={idx}
                disabled={isEllipsis}
                onClick={() => !isEllipsis && setCurrentPage(btn)}
                sx={{
                  minWidth: isEllipsis ? "35px" : "48px",
                  height: "48px",
                  borderRadius: "16px",
                  fontWeight: 800,
                  bgcolor: isActive
                    ? "#F59E0B"
                    : isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.8)",
                  color: isActive ? "#fff" : "text.primary",
                  border: "1px solid",
                  borderColor: isActive ? "#F59E0B" : "rgba(0,0,0,0.06)",
                  "&:hover": {
                    bgcolor: "#F59E0B",
                    color: "#fff",
                    transform: !isEllipsis ? "translateY(-4px)" : "none",
                  },
                }}
              >
                {btn}
              </Button>
            );
          })}
        </Stack>
      )}
    </>
  );
});
export default CardsToShowAndTaps;
