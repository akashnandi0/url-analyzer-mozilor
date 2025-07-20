"""Router for URL analysis module."""

import logging
from fastapi import APIRouter, Depends, Query

from utils.response import CustomORJSONResponse
from .service import analyze_url, analyze_url_summary, analyze_website_details
from .schemas import (
    UrlAnalyzerRequestSchema,
    UrlAnalyzerSummarySchema,
    SummaryDetailsSchema,
)
from utils.dependencies import verify_token

router = APIRouter(
    tags=["Url Analyzer"],
    default_response_class=CustomORJSONResponse,
    dependencies=[Depends(verify_token)],
)


@router.post("/url-analyze")
async def url_analyze(request_body: UrlAnalyzerRequestSchema):
    """analyze url endpoint function"""
    logging.info("Inside analyze_url endpoint")
    res = await analyze_url(request_body.model_dump())
    logging.info("End of analyze_url endpoint")
    return res


@router.get("/url-analyze-summary", response_model=UrlAnalyzerSummarySchema)
async def url_analyze_summary(
    user_id: int = Query(None), page: int = Query(default=1), size: int = Query(default=50)
):
    """analyze url summary endpoint function"""
    logging.info("Inside url_analysis_summary endpoint")
    res = await analyze_url_summary(user_id, page, size)
    logging.info("End of url_analysis_summary endpoint")
    return res


@router.get("/url-analyze-summary-details/{id}", response_model=SummaryDetailsSchema)
async def analysis_summary_details(id: int, user_id: int):
    """analyze url summary details endpoint function"""
    logging.info("Inside url_analysis_summary endpoint")
    res = await analyze_website_details(id, user_id)
    logging.info("End of url_analysis_summary endpoint")
    return res
