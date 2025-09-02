import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { SidebarLink } from '../types';
import '../styles/Sidebar.css';

const sidebarLinks: SidebarLink[] = [
  {
    id: 1,
    href: 'https://empresassjc.healthbit.com.br/',
    title: 'Movimentação cadastral',
    icon: 'fas fa-database'
  },
  {
    id: 2,
    href: 'http://portal.santacasasaudesjc.com.br:65004/portalfinanceiropj/',
    title: 'Portal financeiro',
    icon: 'fas fa-dollar-sign'
  },
  {
    id: 3,
    href: 'https://santacasasaudesjc.dev.br/mvsaudeweb/#/login/beneficiario',
    title: 'Portal beneficiario',
    icon: 'fas fa-user'
  }
];

const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="profile-image">
          <img 
            src={theme === 'dark' ? '/images/2.png' : '/images/logo_scs.png'} 
            alt="Foto de Perfil" 
            id="profile-img"
          />
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <h2 className="sidebar-title">Portais</h2>
        <div className="sidebar-links">
          {sidebarLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="sidebar-link"
            >
              <i className={link.icon}></i>
              <span>{link.title}</span>
            </a>
          ))}
        </div>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={toggleTheme} className="theme-btn">
          <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

