import './Footer.css';

const Footer = ({ onNavigate }) => {
  const navigate = (sectionId) => onNavigate?.(sectionId);

  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-mark"><img src="/icons/pet2icon.png" alt="" /></span>
            <div><strong>Tu Mascota</strong><small>Tandil · red comunitaria</small></div>
          </div>
          <p className="footer-statement">Una comunidad que se mueve para que cada mascota pueda volver a casa.</p>
        </div>

        <div className="footer-links">
          <div>
            <span>Explorar</span>
            <button onClick={() => navigate('inicio')}>Inicio</button>
            <button onClick={() => navigate('perdidos')}>Mascotas perdidas</button>
            <button onClick={() => navigate('encontrados')}>Mascotas encontradas</button>
          </div>
          <div>
            <span>Participar</span>
            <button onClick={() => navigate('buscaTuMascota')}>Crear publicación</button>
            <button onClick={() => navigate('reportarEncuentro')}>Avisar encuentro</button>
            <button onClick={() => navigate('veterinarias')}>Veterinarias</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Tu Mascota Tandil</span>
          <div>
            <span>Desarrollado por Hernán Berrino</span>
            <a href="https://www.linkedin.com/in/hernanberrino/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/hberrino" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
