// src/components/UserCreateForm.js
import React, { useState } from "react";
import "./UserCreateForm.css";

function UserCreateForm({ onSubmit, onClose }) {
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(user); // Enviar los datos del nuevo usuario
        onClose(); // Cerrar el modal después de enviar
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Nuevo Usuario</h5>
                        <button type="button" className="btn btn-secondary position-absolute top-0 end-0 me-2 mt-2" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    value={user.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="apellido"
                                    value={user.apellido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserCreateForm;
