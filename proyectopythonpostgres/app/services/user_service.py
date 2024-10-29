from sqlalchemy.orm import Session
from app.repositories.user_repository import crear_usuario,obtener_usuario_por_email, obtener_usuarios_repo,obtener_userbyId_repo,eliminar_usuario_repo
from app.schemas import UsuarioCreate,UsuarioUpdate
from app.models import Usuario
from app.utils.hashing import hash_password

def registrar_usuario(db: Session, usuario_data: UsuarioCreate):
    usuario_existente = obtener_usuario_por_email(db, usuario_data.email)
    if usuario_existente:
        raise ValueError("El usuario ya existe.")
    usuario_data.password = hash_password(usuario_data.password)
    return crear_usuario(db, usuario_data)

def obtener_usuarios(db: Session):
    return obtener_usuarios_repo(db)

def actualizar_usuario(db: Session, user_id: int, usuario_data: UsuarioUpdate) -> Usuario:
    return obtener_userbyId_repo(db,user_id,usuario_data)

def eliminar_usuario_service(db: Session, user_id: int):
    return eliminar_usuario_repo(db, user_id)