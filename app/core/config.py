from pydantic_settings import BaseSettings
from pydantic import AnyUrl
from typing import Optional

class Settings(BaseSettings):
    app_name: str = "Vaultverse"
    environment: str = "dev"
    secret_key: str
    access_token_ttl_minutes: int = 15
    refresh_token_ttl_days: int = 30

    database_url: str
    redis_url: str = "redis://localhost:6379/0"

    aws_region: str = "us-east-1"
    kms_key_id: Optional[str] = None

    email_from: str = "no-reply@vaultverse.local"

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

