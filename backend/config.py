"""Used for manage configuration"""

from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Class for settings"""

    database_url: str
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"

    class Config:
        """Env file property"""

        env_file = ".env"


@lru_cache()
def get_settings():
    """Getting settings object

    Returns:
        Settings: Setting object
    """
    return Settings()


settings = get_settings()
