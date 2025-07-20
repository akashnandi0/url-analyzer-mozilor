"""main file for the FastAPI application."""

import logging
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.url_analyzer.router import router as url_analyzer_route
from utils.middlewares import ExceptionMiddleware

# Initialize the FastAPI application
app = FastAPI()

# define each modules routes here
app.include_router(url_analyzer_route)

# middleware to handle exceptions
app.add_middleware(ExceptionMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.DEBUG)
if __name__ == "__main__":

    uvicorn.run("main:app", host="127.0.0.0", port=8000, reload=True)
