"""Service file for URL analysis module."""

import logging

from utils.helpers import (
    call_get_method,
    get_text_content_from_html,
    get_word_frequencies,
)
from db.database import async_session
from db.url_analyzer_module.url_analyzer_dal import URLAnalyzerDAL
from utils.errors import CustomException


async def analyze_url(request_body):
    """service function to analyze url"""
    logging.info("Inside analyze_url function")
    async with async_session() as session:
        async with session.begin():
            try:
                dal_obj = URLAnalyzerDAL(session)
                word_frequency = {}
                url = str(request_body.get("url"))
                # calling the provided endpoint
                website_content = await call_get_method(url)
                # getting text content from the website
                text_content = get_text_content_from_html(website_content)
                word_frequency = get_word_frequencies(text_content)

                if word_frequency:
                    new_obj = {
                        "url": url,
                        "word_frequencies": word_frequency,
                        "user_id": request_body.get("user_id"),
                    }
                    try:
                        res_obj = await dal_obj.create_url_analysis_entry(new_obj)
                    except Exception as ex:
                        logging.error(
                            f"Error Inside create_url_analysis_entry Dal function: {str(ex)}"
                        )
                        raise CustomException(f"Error during database write: {str(ex)}") from ex
                    logging.info("End analyze_url function")
                    return res_obj
            except Exception as ex:
                logging.error(f"Error Inside analyze_url function: {str(ex)}")
                raise Exception(f"Exception during url analysis:{str(ex)}") from ex


async def analyze_url_summary(user_id: int, page: int, size: int):
    """service function to analyze url summary"""
    logging.info("Inside analysis_summary")
    async with async_session() as session:
        async with session.begin():
            try:
                dal_obj = URLAnalyzerDAL(session)
                try:
                    summary = await dal_obj.get_url_analysis_summary(int(user_id), page - 1, size)
                except Exception as ex:
                    logging.error(f"Error Inside get_url_analysis_summary dal function: {str(ex)}")
                    raise Exception(f"Exception during retrieving info from db:{str(ex)}") from ex
                if not summary:
                    logging.info("no data found")
                    return {
                    "data": [],
                    "total_count": 0,
                    "page": page,
                    "size": size,
                }
                try:
                    summary_count = await dal_obj.get_count_of_url_analysis(int(user_id))
                except Exception as ex:
                    logging.error(f"Error Inside get_count_of_url_analysis dal function: {str(ex)}")
                    raise Exception(f"Exception during retrieving count from db:{str(ex)}") from ex
                logging.info("End analysis_summary")
                return {
                    "data": summary,
                    "total_count": summary_count.total_count,
                    "page": page,
                    "size": size,
                }
            except Exception as ex:
                logging.error(f"Error Inside analysis_summary function: {str(ex)}")
                raise Exception(f"Exception during summary retrieval:{str(ex)}") from ex


async def analyze_website_details(id: int, user_id: int):
    """service function to analyze website details"""
    logging.info("Inside website_analysis_details")
    async with async_session() as session:
        async with session.begin():
            try:
                dal_obj = URLAnalyzerDAL(session)
                try:
                    summary = await dal_obj.get_url_analysis_summary_details(int(id), int(user_id))
                except Exception as ex:
                    logging.error(
                        f"Error Inside get_url_analysis_summary_details dal function: {str(ex)}"
                    )
                    raise Exception(f"Exception during retrieving info from db:{str(ex)}") from ex
                if not summary:
                    logging.info("no data found")
                    return ValueError("Details Not Found")
                logging.info("End website_analysis_details")
                return summary
            except Exception as ex:
                logging.error(f"Error Inside website_analysis_details function: {str(ex)}")
                raise Exception(f"Exception during summary details retrieval:{str(ex)}") from ex
