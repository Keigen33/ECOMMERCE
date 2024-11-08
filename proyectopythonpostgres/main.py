from fastapi import FastAPI
from app.db import Base, engine
from app.controllers.user_controller import router as user_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost:3000",  # Dominio de tu aplicación React
]
Base.metadata.create_all(bind=engine)
app.include_router(user_router)

# Configurar el middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Permitir los orígenes en la lista
    allow_credentials=True,
    allow_methods=["*"],           # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],           # Permitir todos los encabezados
)