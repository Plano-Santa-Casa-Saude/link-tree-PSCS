// 🎨 Paleta de cores
var bgPrimary = '#0a1929';
var bgSecondary = '#132f4c';
var textPrimary = '#ffffff';
var textSecondary = '#f8bd1c';
var accentColor = '#ff8c42';
var accentHover = '#d4af0a';
var borderColor = '#1e4976';
var shadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';




export const LogoSantacasa = {
    height: "auto",
  width: "9em",
    
}



// Style.js (ou Style.tsx)
export const ItemMenuDark = {
  background: `linear-gradient(135deg, ${bgPrimary} 0%, ${bgSecondary} 100%)`,
  border: `2px solid ${bgSecondary}`,
  borderRadius: "12px",

  textDecoration: "none",
  color: `${textPrimary}`,
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  transition: "all 0.3s ease",
  boxShadow: `${shadow}`,
  position: "relative",
  overflow: "hidden",
  backdropFilter: "blur(5px)",

  // HOVER APLICA TANTO NO ITEM QUANTO NO ÍCONE FILHO
  "&:hover": {
    color: `${bgPrimary}`,
    background: `linear-gradient(135deg, ${accentColor} , ${accentHover})`,
    borderRadius: "10px",
    border: `1px solid ${borderColor}`,

    "& .MuiSvgIcon-root": {
      color: `${bgPrimary}`, // muda a cor do ícone junto
    },
  },
  "&:actived":{
    color: `${bgPrimary}`,
    background: `linear-gradient(135deg, ${accentColor} , ${accentHover})`,
    borderRadius: "10px",
    border: `1px solid ${borderColor}`,

    "& .MuiSvgIcon-root": {
      color: `${bgPrimary}`, // muda a cor do ícone junto
    },
  }
};

export const MenuIconDark = {
  color: `${textSecondary}`, // cor padrão
  transition: "color 0.3s ease",
};
