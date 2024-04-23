import React from "react";
import '../style/menu.css';
import LogoDocher from "../../public/logoDocher.jpg";


const Menu = () => {
	return (
		<>
			<div className="content">
				<div className="box-inicio">
					<div className="login-box">
						<h2 className="text-center mb-4">Bienvenido a <span className="brand-name">Docher Company</span></h2>
						<div className="form-floating mb-3">
							<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
							<label htmlFor="floatingInput" className="form-label color-label">Correo electrónico</label>
						</div>
						<div className="form-floating mb-4">
							<input type="password" className="form-control" id="floatingPassword" placeholder="Contraseña" required />
							<label htmlFor="floatingPassword" className="form-label color-label">Contraseña</label>
						</div>
						<button className="btn btn-primary btn-lg btn-block mb-4" type="submit">Ingresar</button>
						<div className="text-center">
							<a href="#" className="text-light">¿Olvidaste tu contraseña?</a>
						</div>
					</div>
					<div className="login-img">
						<img src={LogoDocher} className="logo" alt="Logo" />
					</div>
				</div>
				<div className="custom-shape-divider-bottom-1681939430">
					<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
						<path d="M321.39,56.4c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.85c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.4Z" className="shape-fill"></path>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Menu;



