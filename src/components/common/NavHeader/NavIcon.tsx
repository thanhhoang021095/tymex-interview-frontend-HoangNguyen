import React from 'react';
import './navIcon.style.css';

interface NavIconProps {
  isToggle: boolean;
}

const NavIcon: React.FC<NavIconProps> = ({ isToggle }) => {
  return (
    <div id="nav-icon" className={isToggle ? 'open-nav' : ''}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default NavIcon;
