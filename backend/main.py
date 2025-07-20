"""main file"""

import logging
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.user_management_module.router import router as user_management_route
from apps.url_analyzer_module.router import router as url_analyzer_route
from utils.middlewares import ExceptionMiddleware

# Initialize the FastAPI application
app = FastAPI()

# define each modules routes here
app.include_router(user_management_route)
app.include_router(url_analyzer_route)

# middleware to handle exceptions
# This middleware will catch exceptions and return a JSON response
origins = ["http://localhost", "http://localhost:8080", "http://localhost:5173"]
app.add_middleware(ExceptionMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.DEBUG)
if __name__ == "__main__":

    uvicorn.run("main:app", host="127.0.0.0", port=8000, reload=True)
