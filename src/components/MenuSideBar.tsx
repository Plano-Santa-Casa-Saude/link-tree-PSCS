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
  Tooltip,
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

import FiltroBeneficiario from "./FiltroBeneficiarios";
import DetalheBeneficiario from "../pages/Detalhado";

//-------------------------------------//

import {
  LogoSantacasa,
} from "../styles/StyleMenuSideBar";

//LARGURA DO MENU QUANDO ELE ESTIVER ABERTO
const drawerWidth = 280;

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
  background: "linear-gradient(135deg, #0a1929 0%, #132f4c 100%)",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  minHeight: 80,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "rgba(248, 189, 28, 0.3)",
  }
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
    background: "linear-gradient(180deg, #0a1929 0%, #132f4c 100%)",
    ...(open ? openedMixin(theme) : closedMixin(theme)),
    borderRight: "1px solid rgba(248, 189, 28, 0.2)",
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
              <MenuIcon sx={{ color: '#f8bd1c', fontSize: 28 }} />
            </IconButton>

            <Box
              component="img"
              src="../../public/images/logo_scs_dark.png"
              alt="Logo"
              loading="lazy"
              sx={{
                ...LogoSantacasa,
                ...(!open && { display: "none" }),
                filter: "brightness(1.2)",
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
                <ChevronRightIcon sx={{ color: '#f8bd1c', fontSize: 28 }} />
              ) : (
                <ChevronLeftIcon sx={{ color: '#f8bd1c', fontSize: 28 }} />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider sx={{ borderColor: "rgba(248, 189, 28, 0.3)" }} />

          {/*------------------- 
            LISTA DE LINKS 
        -------------------*/}

          <List sx={{ p: 2 }}>
            {/*------------------- 
                   LINK 
          -------------------*/}

            <ListItem
              key="Home"
              disablePadding
              sx={{ mb: 1 }}
            >
              <Tooltip title="Página Inicial" placement="right" disableHoverListener={open}>
                <ListItemButton
                  sx={{
                    minHeight: 56,
                    px: 2.5,
                    borderRadius: 2,
                    justifyContent: open ? "initial" : "center",
                    background: location.pathname === "/" ? "rgba(248, 189, 28, 0.15)" : "transparent",
                    border: location.pathname === "/" ? "1px solid rgba(248, 189, 28, 0.4)" : "1px solid transparent",
                    "&:hover": {
                      background: "rgba(248, 189, 28, 0.1)",
                      borderColor: "rgba(248, 189, 28, 0.6)",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      mr: open ? 3 : "auto",
                      color: location.pathname === "/" ? "#f8bd1c" : "#ffffff",
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>

                  <ListItemText
                    primary="Página Inicial"
                    sx={{ 
                      opacity: open ? 1 : 0,
                      "& .MuiTypography-root": {
                        fontWeight: location.pathname === "/" ? 600 : 400,
                        color: location.pathname === "/" ? "#f8bd1c" : "#ffffff",
                      }
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
        </Drawer>
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            background: "linear-gradient(135deg, #0a1929 0%, #132f4c 100%)",
            minHeight: "100vh",
            transition: "margin-left 0.2s ease-in-out",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
