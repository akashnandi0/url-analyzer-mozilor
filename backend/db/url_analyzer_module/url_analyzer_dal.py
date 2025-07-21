"""URL Analysis Data Access Layer (DAL) for database operations."""

from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from .models import URLAnalysis


class URLAnalyzerDAL:
    """Data Access Layer for URL Analysis operations."""

    def __init__(self, db_session: Session):
        """Initialize the URLAnalyzerDAL with a database session."""
        self.db = db_session

    async def get_url_analysis_entry(self, url: str, user_id: int):
        """function to get url analysis entry by url and user_id"""
        query = select(URLAnalysis).filter(
            URLAnalysis.url == url, URLAnalysis.user_id == user_id
        )
        result = await self.db.execute(query)
        return result.first()
    
    async def create_url_analysis_entry(self, create_obj):
        """function to create url analysis object"""

        new_obj = URLAnalysis(**create_obj)
        self.db.add(new_obj)
        await self.db.commit()
        return new_obj

    async def get_url_analysis_summary(self, user_id, page=None, size=None):
        """function to get url analysis summary"""

        query = select(
            URLAnalysis.url,
            URLAnalysis.word_frequencies,
            URLAnalysis.id,
            URLAnalysis.created_at,
        )
        print(f"User ID: {user_id}, Page: {page}, Size: {size}")
        query = query.filter(URLAnalysis.user_id == user_id).order_by(
            URLAnalysis.created_at.desc(), URLAnalysis.id.desc()
        )
        if size is not None and page is not None:
            query = query.offset(page * size).limit(size)
        result = await self.db.execute(query)
        return result.all()

    async def get_count_of_url_analysis(self, user_id):
        """function to get count of url analysis"""

        query = select(func.count(URLAnalysis.id).label("total_count")).filter(
            URLAnalysis.user_id == user_id
        )
        result = await self.db.execute(query)
        return result.first()

    async def get_url_analysis_summary_details(self, id, user_id):
        """function to get url analysis summary details"""

        query = select(
            URLAnalysis.url,
            URLAnalysis.word_frequencies,
            URLAnalysis.id,
            URLAnalysis.created_at,
        )
        query = query.filter(URLAnalysis.id == id and URLAnalysis.user_id == user_id)
        result = await self.db.execute(query)
        return result.first()
