"""Service file for user management"""

import logging
from db.database import async_session
from db.user_management_module.user_management_dal import UserManagementDAL
from .schemas import UserCreateSchema
from utils.helpers import hash_password, verify_password, generate_jwt_token
from utils.errors import CustomException


async def create_new_user(request_body: UserCreateSchema):
    """Function to handle user creation logic."""
    logging.info("Inside create_user service function")
    async with async_session() as session:
        async with session.begin():
            try:
                user_crud = UserManagementDAL(session)
                user_data = request_body.model_dump()
                try:
                    already_exists = await user_crud.get_user_by_email(user_data.get("email", ""))
                except Exception as ex:
                    logging.error(f"Error inside get_user_by_email dal function: {str(ex)}")
                    raise CustomException(f"Exception during Fetching Data From DB : {str(ex)}")
                if already_exists:
                    logging.info("email already exists")
                    raise ValueError("User with this email already exists.")
                user_data["password"] = hash_password(user_data.get("password", ""))
                try:
                    # Create the user in the database
                    new_user = await user_crud.create_user(user_data)
                except Exception as ex:
                    logging.error(f"Error inside create_user dal function: {str(ex)}")
                    raise CustomException(f"Exception during Saving Data to DB : {str(ex)}")
                logging.info("End of create_user function")
                return new_user
            except Exception as ex:
                logging.error(f"Error inside create_user function: {str(ex)}")
                raise Exception(f"Exception during user creation : {str(ex)}") from ex


async def verify_user(request_body: UserCreateSchema):
    """Function to handle user verification logic."""
    logging.info("Inside verify_user service function")
    async with async_session() as session:
        async with session.begin():
            try:
                user_crud = UserManagementDAL(session)
                user_data = request_body.model_dump()

                # Retrieve the user by email
                try:
                    user = await user_crud.get_user_by_email(user_data.get("email", ""))
                except Exception as ex:
                    logging.error(f"Error inside get_user_by_email dal function: {str(ex)}")
                    raise CustomException(
                        f"Exception during Fetching Data from DB : {str(ex)}"
                    ) from ex
                if not user:
                    logging.info("user not found")
                    raise ValueError("User not found.")

                # Verify the password
                if not verify_password(user_data.get("password", ""), user.User.password):
                    logging.info("invalid password")
                    raise ValueError("Invalid password.")
                payload = {"id": user.User.id, "email": user.User.email}
                token = generate_jwt_token(payload)
                logging.info("End of verify_user service function")
                return {"access_token": token, **payload}
            except Exception as ex:
                logging.error(f"Error inside verify_user function: {str(ex)}")
                raise Exception(f"Exception during login : {str(ex)}") from ex
