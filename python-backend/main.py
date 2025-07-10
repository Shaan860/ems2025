from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from typing import List, Optional

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ✅ FastAPI app
app = FastAPI()

# ✅ SQLAlchemy setup
DATABASE_URL = "sqlite:///./employees.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

# ✅ DB model
class EmployeeDB(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String, index=True)
    lastName = Column(String, index=True)
    email = Column(String, unique=True, index=True)

# ✅ Create tables
Base.metadata.create_all(bind=engine)

# ✅ Pydantic model for request & response
class Employee(BaseModel):
    firstName: str
    lastName: str
    email: str

# ✅ Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Get all employees
@app.get("/employees", response_model=List[Employee])
def get_employees(x_token: Optional[str] = Header(None)):
    if x_token != "mysecrettoken":
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    db = next(get_db())
    employees = db.query(EmployeeDB).all()
    return employees

# ✅ Add new employee
@app.post("/employees", response_model=Employee, status_code=201)
def add_employee(employee: Employee, x_token: Optional[str] = Header(None)):
    if x_token != "mysecrettoken":
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    db = next(get_db())
    db_employee = EmployeeDB(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

# ✅ Update employee
@app.put("/employees/{employee_id}", response_model=Employee)
def update_employee(employee_id: int, updated_employee: Employee, x_token: Optional[str] = Header(None)):
    if x_token != "mysecrettoken":
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    db = next(get_db())
    employee = db.query(EmployeeDB).filter(EmployeeDB.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    employee.firstName = updated_employee.firstName
    employee.lastName = updated_employee.lastName
    employee.email = updated_employee.email
    db.commit()
    db.refresh(employee)
    return employee
