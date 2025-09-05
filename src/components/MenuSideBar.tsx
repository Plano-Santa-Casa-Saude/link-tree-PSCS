import {useState} from "react";
import { useLocation } from "react-router-dom";

//----------------------------------------//
//---------------MUI---------------------//
//--------------------------------------//
import {
  styled,
  useTheme,
  type Theme,
  type CSSObject,
} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  List,
  CssBaseline,
  Divider,
  IconButton,
  Box,
} from "@mui/material";

//--------------------------------//
//----------ICONES---------------//
//------------------------------//
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
//------------------------------------------//

//----------------------------------------//
//-----------COMPONENTES-----------------//
//--------------------------------------//

import FiltroBeneficiario from "./beneficiaryFilters";
import DetalheBeneficiario from "../pages/Detalhado";

//-------------------------------------//

import {
  MenuIconDark,
  ItemMenuDark,
  LogoSantacasa,
} from "../styles/StyleMenuSideBar";

//LARGURA DO MENU QUANDO ELE ESTIVER ABERTO
const drawerWidth = 250;

//ABRE O MENU
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

//FECHAR O MENU
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

//CABECALHO DO MENU
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#132f4c",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1.5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//MENU
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: "#132f4c", // aplica cor de fundo correta

    ...(open ? openedMixin(theme) : closedMixin(theme)),
  },
  ...(open ? openedMixin(theme) : closedMixin(theme)),
}));

export default function MenuSideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Determina qual conteúdo renderizar baseado na rota atual
  const renderContent = () => {
    if (location.pathname.startsWith("/Detalhado")) {
      return <DetalheBeneficiario />;
    }
    return <FiltroBeneficiario />;
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/*------------------- 
                MENU 
        -------------------*/}

        <Drawer variant="permanent" open={open}>
          {/*------------------- 
          CABECALHO DO MENU 
        -------------------*/}
          <DrawerHeader>
            {/*------------------- 
                ICONE MENU 
          -------------------*/}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[open && { display: "none" }]}
            >
              <MenuIcon sx={MenuIconDark} />
            </IconButton>

            <Box
              component="img"
              src="../../public/images/logo_scs_dark.png"
              alt="Logo"
              loading="lazy"
              sx={{
                ...LogoSantacasa,
                ...(!open && { display: "none" }),
              }}
            />

            {/*------------------- 
                ICONE SETA 
          -------------------*/}

            <IconButton
              onClick={handleDrawerClose}
              sx={[!open && { display: "none" }]}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={MenuIconDark} />
              ) : (
                <ChevronLeftIcon sx={MenuIconDark} />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          {/*------------------- 
            LISTA DE LINKS 
        -------------------*/}

          <List sx={{ p: 1 }}>
            {/*------------------- 
                   LINK 
          -------------------*/}

            <ListItem
              key="Home"
              disablePadding
              sx={[{ display: "block" }, ItemMenuDark]} // aplica estilo no pai
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                  }}
                >
                  {/* Ícone herda a cor e muda no hover do pai */}
                  <HomeIcon sx={MenuIconDark} />
                </ListItemIcon>

                <ListItemText
                  primary="Home"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          sx={{
            p: 3,
            minHeight: "100vh", // ocupa a tela inteira
            display: "flex",
            flexDirection: "column",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
