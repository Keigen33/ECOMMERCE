import React from "react";


function UserList({ users, onEdit, onDelete, onCreate }) {
    return (
        <div className="container mt-4">
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acualizado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.email}</td>
                            <td>USER</td>
                            <td>10-12-2025</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => onEdit(user)}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(user.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
