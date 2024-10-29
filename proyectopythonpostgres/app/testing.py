from db import SessionLocal
from sqlalchemy import text

def test_connection():
    try:
        db = SessionLocal()
        result = db.execute(text("SELECT 1")).scalar()
        if result == 1:
            print("Conexión exitosa a la base de datos.")
        else:
            print("No se pudo ejecutar la consulta en la base de datos.")
        db.close()
    except Exception as e:
        print("Error al conectar a la base de datos:", e)

if __name__ == "__main__":
    test_connection()
