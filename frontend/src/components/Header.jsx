
const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenuClick}>☰</button>
      <div className="header-logo">LOGO</div>
    </header>
  );
};

export default Header;
