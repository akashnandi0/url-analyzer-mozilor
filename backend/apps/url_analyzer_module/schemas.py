"""schema file for URL analyzer module."""

import datetime
from pydantic import BaseModel, HttpUrl, ConfigDict
from typing import List


class UrlAnalyzerRequestSchema(BaseModel):
    """schema for url analyzer request"""

    url: HttpUrl
    user_id: int


class SummaryDetailsSchema(BaseModel):
    """schema for summary details"""

    model_config = ConfigDict(from_attributes=True)

    id: int
    url: str
    word_frequencies: dict
    created_at: datetime.datetime


class UrlAnalyzerSummarySchema(BaseModel):
    """schema for url summary"""

    data: List[SummaryDetailsSchema]
    total_count: int
    page: int
    size: int
