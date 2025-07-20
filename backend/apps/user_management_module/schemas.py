"""pydantic schemas for user management"""

from pydantic import BaseModel, EmailStr, constr, ConfigDict


class BaseUserSchema(BaseModel):
    """Base schema for user management."""

    email: EmailStr


class UserCreateSchema(BaseUserSchema):
    """Schema for user creation."""

    password: constr(min_length=8, max_length=15)


class UserSchema(BaseUserSchema):
    """Schema for user data."""

    model_config = ConfigDict(from_attributes=True)
    id: int


class LoginResponseSchema(UserSchema):
    """Schema for login response."""

    access_token: str
