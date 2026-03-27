from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from argon2 import PasswordHasher
import jwt

from app.core.config import settings

ph = PasswordHasher()


def hash_password(plain_password: str) -> str:
    return ph.hash(plain_password)


def verify_password(plain_password: str, password_hash: str) -> bool:
    try:
        return ph.verify(password_hash, plain_password)
    except Exception:
        return False


def create_jwt(subject: str, expires_delta: timedelta, extra: Optional[dict[str, Any]] = None) -> str:
    now = datetime.now(timezone.utc)
    payload: dict[str, Any] = {"sub": subject, "iat": int(now.timestamp()), "exp": int((now + expires_delta).timestamp())}
    if extra:
        payload.update(extra)
    token = jwt.encode(payload, settings.secret_key, algorithm="HS256")
    return token


def create_access_token(user_id: str) -> str:
    return create_jwt(user_id, timedelta(minutes=settings.access_token_ttl_minutes), {"type": "access"})


def create_refresh_token(user_id: str) -> str:
    return create_jwt(user_id, timedelta(days=settings.refresh_token_ttl_days), {"type": "refresh"})

