from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_size=10,       
    max_overflow=5,   
    pool_timeout=30,
    )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()