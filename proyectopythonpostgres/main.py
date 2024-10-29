from fastapi import FastAPI
from app.db import Base, engine
from app.controllers.user_controller import router as user_router

app = FastAPI()
Base.metadata.create_all(bind=engine)
app.include_router(user_router)
