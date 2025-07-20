"""dependencies"""

from fastapi import Request, status, HTTPException, Security
from fastapi.security.api_key import APIKeyHeader
import jwt
from config import settings

api_key = APIKeyHeader(name="Authorization")


def verify_token(request: Request, token=Security(api_key)):
    """verify jwt token"""
    try:
        token = token.split(" ")[-1]
        return jwt.decode(token, settings.jwt_secret_key, algorithms=settings.jwt_algorithm)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token"
        ) from exc
