import { useState } from 'react';
import './Inicio.css';

const Inicio = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('berrinohernan@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  return (
    <div className="home-shell">
      <div className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Red solidaria de Tandil</div>
          <h1>Que volver a casa sea <em>más fácil.</em></h1>
          <p>Una comunidad organizada para publicar, encontrar y reunir mascotas con sus familias de forma simple y rápida.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => onNavigate('buscaTuMascota')}>Perdí mi mascota <span>→</span></button>
            <button className="secondary-action" onClick={() => onNavigate('reportarEncuentro')}>Encontré una mascota</button>
          </div>
          <div className="trust-row">
            <div><strong>100%</strong><span>Comunitario</span></div>
            <div><strong>Tandil</strong><span>Cobertura local</span></div>
            <div><strong>Gratis</strong><span>Para todos</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <img src="/imgs/perritosperdidos.jpg" alt="Perros esperando volver con sus familias" />
          <div className="visual-badge"><span className="pulse" /><div><strong>Red activa</strong><small>Personas ayudando ahora</small></div></div>
          <div className="visual-note">Cada publicación amplía las posibilidades de volver a encontrarse.</div>
        </div>
      </div>

      <section className="steps-block">
        <div className="section-intro">
          <span>Cómo funciona</span>
          <h2>Dos caminos. Un mismo objetivo.</h2>
          <p>Elegí la opción que describe tu situación y nosotros te guiamos.</p>
        </div>
        <div className="action-grid">
          <article className="action-card action-card-dark">
            <span className="card-number">01</span>
            <div className="card-icon"><img src="/icons/pet1icon.png" alt="" /></div>
            <h3>Publicar una búsqueda</h3>
            <p>Cargá los datos, una foto clara y el último lugar donde fue vista. La comunidad podrá contactarte.</p>
            <button onClick={() => onNavigate('buscaTuMascota')}>Crear publicación <span>↗</span></button>
          </article>
          <article className="action-card action-card-light">
            <span className="card-number">02</span>
            <div className="card-icon"><img src="/icons/findicon.png" alt="" /></div>
            <h3>Explorar y ayudar</h3>
            <p>Revisá las publicaciones recientes y compartí información útil para acelerar el reencuentro.</p>
            <button onClick={() => onNavigate('perdidos')}>Ver mascotas perdidas <span>↗</span></button>
          </article>
        </div>
      </section>

      <div className="support-strip">
        <div><span>¿Necesitás ayuda?</span><strong>Estamos para orientarte</strong></div>
        <p>Escribinos si tenés dudas sobre cómo publicar o reportar un encuentro.</p>
        <button onClick={handleCopyEmail}>{copied ? 'Correo copiado' : 'Copiar correo'}</button>
      </div>
    </div>
  );
};

export default Inicio;
