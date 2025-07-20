""" Middleware to handle exceptions"""

from fastapi.responses import JSONResponse
from fastapi import status
from pydantic import ValidationError
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request

from utils.errors import CustomException


class ExceptionMiddleware(BaseHTTPMiddleware):
    """Middleware to handle exception

    Args:
        BaseHTTPMiddleware (starlette.middleware.base): Middleware baseclass
    """

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> JSONResponse:
        try:
            response = await call_next(request)
        except ValidationError as exc:
            response = JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                content={
                    "error": {
                        "description": exc.errors(),
                        "errorCode": "ERR422",
                    }
                },
            )
        except ValueError as exc:
            response = JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "error": {
                        "description": str(exc),
                        "errorCode": "ERR400",
                    }
                },
            )
        except CustomException as exc:
            response = JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                content={
                    "error": {
                        "description": str(exc),
                        "errorCode": "ERR433",
                    }
                },
            )
        except Exception as exc:
            response = JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "error": {
                        "description": str(exc),
                        "errorCode": "ERR400",
                    }
                },
            )

        return response
