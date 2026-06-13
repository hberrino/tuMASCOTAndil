import { useState } from 'react';
import './Navbar.css';

const links = [
  ['inicio', 'Inicio'],
  ['perdidos', 'Perdidos'],
  ['encontrados', 'Encontrados'],
  ['buscaTuMascota', 'Publicar'],
  ['reportarEncuentro', 'Avisar encuentro'],
  ['veterinarias', 'Veterinarias'],
];

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (event, sectionId) => {
    event.preventDefault();
    onNavigate(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="site-nav">
      <div className="nav-shell">
        <a className="brand" href="#inicio" onClick={(event) => handleClick(event, 'inicio')}>
          <span className="brand-mark"><img src="/icons/pet2icon.png" alt="" /></span>
          <span><strong>Tu Mascota</strong><small>Tandil · red comunitaria</small></span>
        </a>

        <ul className="desktop-nav">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(event) => handleClick(event, id)}>{label}</a>
            </li>
          ))}
        </ul>

        <button
          className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
        {links.map(([id, label], index) => (
          <a key={id} href={`#${id}`} onClick={(event) => handleClick(event, id)}>
            <span>0{index + 1}</span>{label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
