from pydantic import BaseModel, EmailStr
from typing import Optional


class UsuarioBase(BaseModel):
    nombre: str
    apellido: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    password: str 

class UsuarioResponse(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: EmailStr

class Config:
        orm_mode = True  # Permite que Pydantic trabaje con objetos ORM

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str]= None
    email: Optional[EmailStr] = None
    password: Optional[str] = None