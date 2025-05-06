import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; 

const Login = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-white">
      <div className="text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <img
          src="/logo.svg" 
          alt="Logo"
          className="mb-4"
          style={{ width: '40px', height: '40px' }}
        />

        <h4 className="mb-4 fw-bold">Entre ou cadastre-se</h4>

        <div className="mb-3">
          <button className="btn btn-light w-100 border d-flex align-items-center justify-content-center mb-2">
            <span className="me-2">G</span>
            Continuar como Gabriel
          </button>

          <button className="btn btn-light w-100 border d-flex align-items-center justify-content-center mb-2">
            <i className="bi bi-apple me-2"></i>
            Continue com a Apple
          </button>

          <button className="btn btn-light w-100 border d-flex align-items-center justify-content-center mb-2">
            <i className="bi bi-facebook me-2"></i>
            Continue com o Facebook
          </button>
        </div>

        <div className="my-3 text-muted">ou</div>

        <input type="email" className="form-control mb-3" placeholder="E-mail" />
        <button className="btn btn-dark w-100 mb-3">Continuar</button>

        <div className="text-muted mb-2">
          <small>Precisa de ajuda para entrar na sua conta?</small>
        </div>

        <div className="text-muted" style={{ fontSize: '0.8rem' }}>
          Ao se cadastrar, você está criando uma conta e concorda com os <a href="#">Termos</a> e a <a href="#">Política de Privacidade</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;
