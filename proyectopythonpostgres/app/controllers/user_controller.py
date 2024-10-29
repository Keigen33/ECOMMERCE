
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import UsuarioCreate, UsuarioResponse,UsuarioUpdate
from app.services.user_service import registrar_usuario,obtener_usuarios,actualizar_usuario,eliminar_usuario_service
from app.db import get_db

router = APIRouter()

@router.post(
    "/create_user/",
    response_model=UsuarioResponse,
    status_code=status.HTTP_200_OK,
    responses={
        200: {"description": "Usuario creado exitosamente"},
        400: {"description": "Error al crear el usuario"},
    },
    summary="Crea un nuevo usuario en el sistema",
    tags=["Usuarios"]
)
def create_user(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    try:
        nuevo_usuario = registrar_usuario(db, usuario)
        return nuevo_usuario
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "/usuarios/",
    response_model=list[UsuarioResponse],
    status_code=status.HTTP_200_OK,
    summary="Obtiene todos los usuarios del sistema",
    tags=["Usuarios"]
)
def get_users(db: Session = Depends(get_db)):
    usuarios = obtener_usuarios(db)
    return usuarios


@router.put(
    "/usuarios/{user_id}",
    response_model=UsuarioResponse,
    status_code=status.HTTP_200_OK,
    summary="Actualiza un usuario existente",
    tags=["Usuarios"]
)
def update_user(user_id: int, usuario: UsuarioUpdate, db: Session = Depends(get_db)):
    usuario_actualizado = actualizar_usuario(db, user_id, usuario)
    if usuario_actualizado is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    return usuario_actualizado

@router.delete(
    "/usuarios/{user_id}",
    status_code=status.HTTP_200_OK,
    summary="Elimina un usuario",
    tags=["Usuarios"]
)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    usuario_eliminado = eliminar_usuario_service(db, user_id)
    if usuario_eliminado is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    return {"detail": "Usuario eliminado correctamente"}