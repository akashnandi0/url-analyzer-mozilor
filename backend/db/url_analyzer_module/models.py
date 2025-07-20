"""Url Analysis Models"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from db.database import Base
from db.user_management_module.models import User


class URLAnalysis(Base):
    """URL Analysis model class"""

    __tablename__ = "url_analysis"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    word_frequencies = Column(JSON)
    created_at = Column(DateTime, default=datetime.now)
    user_id = Column(Integer, ForeignKey(User.id))

    user = relationship("User", back_populates="analysis")
