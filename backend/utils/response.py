"""Response module"""

from typing import Any
import orjson
from fastapi import Response


class CustomORJSONResponse(Response):
    """Custom json response class

    Args:
        Response (FastAPI Response): Response object

    Returns:
        JSON: json data
    """

    media_type = "application/json"

    def render(self, content: Any) -> bytes:
        """standardized response formatting"""
        return orjson.dumps({"data": content}, option=orjson.OPT_INDENT_2)
