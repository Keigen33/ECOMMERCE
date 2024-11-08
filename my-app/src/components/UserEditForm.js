import React, { useState, useEffect } from "react";

function UserEditForm({ user, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        id: null,          // Incluir el ID en el estado, pero sin mostrarlo en el formulario
        nombre: "",
        apellido: "",
        email: ""
    });

    // Cargar los datos del usuario seleccionado cuando el modal se abre
    useEffect(() => {
        if (user) {
            setFormData({
                id:user.id,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Llama a la función onSubmit para guardar cambios
        onClose(); // Cierra el modal
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Usuario</h5>
                        <button type="button" className="close" onClick={onClose}>
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
                                    value={formData.nombre}
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
                                    value={formData.apellido}
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
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

export default UserEditForm;
