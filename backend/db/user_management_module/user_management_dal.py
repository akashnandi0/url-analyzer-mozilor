"""User CRUD Data Access Layer (DAL) for database operations."""

from sqlalchemy.orm import Session
from sqlalchemy.future import select
from .models import User


class UserManagementDAL:
    """Data Access Layer for User CRUD operations."""

    def __init__(self, db_session: Session):
        """Initialize the UserCrudDAL with a database session."""
        self.db = db_session

    async def create_user(self, user_data):
        """Create a new user in the database."""
        new_user = User(**user_data)
        self.db.add(new_user)
        await self.db.commit()
        return new_user

    async def get_user_by_email(self, email: str):
        """Retrieve a user by their email address."""
        query = select(User).filter(User.email == email)
        result = await self.db.execute(query)
        return result.first()
