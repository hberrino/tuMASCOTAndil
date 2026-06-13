import Admin from './Admin';

const AdminPage = () => (
  <main className="admin-page">
    <a href="/" className="admin-back">← Volver al sitio</a>
    <div className="admin-page-shell"><Admin /></div>
  </main>
);

export default AdminPage;
