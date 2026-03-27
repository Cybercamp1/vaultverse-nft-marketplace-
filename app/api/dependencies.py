from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.db import get_db

DbDep = Session

def get_db_dep(db: Session = Depends(get_db)) -> Session:
    return db

