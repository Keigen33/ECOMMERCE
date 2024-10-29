from sqlalchemy.orm import Session
from app.models import Usuario
from app.schemas import UsuarioCreate,UsuarioUpdate
from app.utils.hashing import hash_password


def crear_usuario(db: Session, usuario_data: UsuarioCreate) -> Usuario:
    nuevo_usuario = Usuario(
        nombre=usuario_data.nombre,
        apellido=usuario_data.apellido,
        email=usuario_data.email,
        passw=usuario_data.password  
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

def obtener_usuario_por_email(db: Session, email: str) -> Usuario:
    return db.query(Usuario).filter(Usuario.email == email).first()

def obtener_usuarios_repo(db: Session):
    return db.query(Usuario).all()


def obtener_userbyId_repo(db: Session, user_id: int, usuario_data: UsuarioUpdate) -> Usuario:
    usuario = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not usuario:
        return None
    if usuario_data.nombre is not None:
        usuario.nombre = usuario_data.nombre
    if usuario_data.apellido is not None:
        usuario.apellido = usuario_data.apellido    
    if usuario_data.email is not None:
        usuario.email = usuario_data.email
    if usuario_data.password is not None:
        usuario.password = hash_password(usuario_data.password)
    db.commit()
    db.refresh(usuario)
    return usuario

def eliminar_usuario_repo(db: Session, user_id: int) -> Usuario:
    usuario = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not usuario:
        return None
    db.delete(usuario)
    db.commit()
    return usuario