"""user_management.router
This module defines the API endpoints for user management operations such as user registration and login.
"""

import logging
from fastapi import APIRouter

from .service import create_new_user, verify_user
from .schemas import UserCreateSchema, UserSchema, LoginResponseSchema
from utils.response import CustomORJSONResponse

router = APIRouter(
    tags=["User"],
    default_response_class=CustomORJSONResponse,
)


@router.post("/user-create", status_code=201, response_model=UserSchema)
async def user_registration(request_body: UserCreateSchema):
    """register new user"""
    logging.info("Inside register_user endpoint")
    res = await create_new_user(request_body)
    logging.info("End of register_user endpoint")
    return res


@router.post("/login", status_code=200, response_model=LoginResponseSchema)
async def user_login(request_body: UserCreateSchema):
    """user login"""
    logging.info("Inside login_user endpoint")
    res = await verify_user(request_body)
    logging.info("End of login_user endpoint")
    return res
