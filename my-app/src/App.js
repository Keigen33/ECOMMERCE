// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserEditForm from "./components/UserEditForm";
import { Plus } from 'lucide-react';
import UserCreateForm from "./components/UserCreateForm";

import "./App.css"; 

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://127.0.0.1:8080/usuarios")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error al cargar los usuarios:", error));
    };

    const addUser = (user) => {
        axios.post("http://127.0.0.1:8080/create_user", user)
            .then(() => fetchUsers())
            .catch(error => console.error("Error al agregar usuario:", error));
    };

    const updateUser = (user) => {
        console.log('USERRRR ' + user)
        axios.put(`http://127.0.0.1:8080/usuarios/${user.id}`, user)
            .then(() => {
                fetchUsers();
                setSelectedUser(null);
            })
            .catch(error => console.error("Error al actualizar usuario:", error));
    };

    const deleteUser = (userId) => {
        axios.delete(`http://127.0.0.1:8080/usuarios/${userId}`)
            .then(() => fetchUsers())
            .catch(error => console.error("Error al eliminar usuario:", error));
    };

    const handleCreateUserClick = () => {
        setIsCreateFormOpen(true);
    };
    const
     handleCreateUserSubmit = (newUser) => {
        addUser(newUser);
        fetchUsers();
        setIsCreateFormOpen(false); 
    };
    const handleEditUserClick = (user) => {
        setSelectedUser(user);
        setIsEditFormOpen(true);
    };
    const 
     handleEditUserSubmit = (user) => {
        updateUser(user);
        setIsEditFormOpen(false); 
        fetchUsers();
    };
    const handleFormClose = () => {
        setIsCreateFormOpen(false); 
        setIsEditFormOpen(false);   
        setSelectedUser(null);
    };




    return (
        <div className="App">
            <div className="container">
                <h1 className="text-center mt-4">Gestión de Usuarios</h1>
                <button
              className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-md"
              onClick={handleCreateUserClick}
              >
              <Plus className="w-4 h-4 mr-2 text-black" />
              Crear Usuario
            </button>
                <UserList users={users} onEdit={handleEditUserClick} onDelete={deleteUser} />
            
            {isCreateFormOpen && (
                <UserCreateForm
                    onSubmit={handleCreateUserSubmit}
                    onClose={handleFormClose}
                />
            )}
            {isEditFormOpen && selectedUser && (
                <UserEditForm
                    user={selectedUser}
                    onSubmit={handleEditUserSubmit}
                    onClose={handleFormClose}
                />
            )}
            </div>
        </div>

    );
}

export default App;
