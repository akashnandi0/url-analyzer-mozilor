"""helpers.py
Utility File for common helper functions.
"""

import logging
import datetime
from collections import Counter
import re
import httpx
import jwt
from bs4 import BeautifulSoup
from passlib.context import CryptContext
from config import settings
from .errors import CustomException
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

# define password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Define a set of English stop words
STOP_WORDS = set(ENGLISH_STOP_WORDS)


def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    try:
        if not password:
            raise ValueError("Password cannot be empty.")
        hash_pass = pwd_context.hash(password)
        return hash_pass
    except Exception as ex:
        logging.error(f"Error Inside hash_password function: {str(ex)}")
        raise CustomException(f"Error hashing password: {str(ex)}") from ex


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hashed password."""
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception as ex:
        logging.error(f"Error Inside verify_password function: {str(ex)}")
        raise CustomException(f"Error verifying password: {str(ex)}") from ex


def generate_jwt_token(payload: dict) -> str:
    """Generate a JWT token."""
    try:
        payload["exp"] = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(
            minutes=180
        )  # Set expiration time
        return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    except Exception as ex:
        logging.error(f"Error Inside generate_jwt_token function: {str(ex)}")
        raise CustomException(f"Error generating JWT token: {str(ex)}") from ex


async def call_get_method(endpoint: str):
    """function to call get method"""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(endpoint)
            response.raise_for_status()
            return response
    except Exception as ex:
        logging.error(f"Exception Inside call_get_method function : {str(ex)}")
        raise CustomException(f"Error During Api call: {str(ex)}") from ex


def get_text_content_from_html(html_content):
    """Function to get text content from html using beautiful soup"""
    try:
        soup = BeautifulSoup(html_content.text, "html.parser")
        for script in soup(["script", "style"]):
            script.decompose()
        text = soup.get_text()
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = " ".join(chunk for chunk in chunks if chunk)
        return text
    except Exception as ex:
        logging.error(f"Error inside get_text_content_from_html function: {str(ex)}")
        raise CustomException(f"Error During content Extraction : {str(ex)}") from ex


def get_word_frequencies(text: str):
    """Function to Find each word count"""
    try:
        words = re.findall(r"\b\w+\b", text.lower())
        words = [word for word in words if word not in STOP_WORDS and word.isalpha()]
        word_freq = Counter(words)
        return dict(word_freq.most_common(5))
    except Exception as ex:
        logging.error(f"Error inside get_word_frequencies function: {str(ex)}")
        raise CustomException(f"Error During word frequency computation : {str(ex)}") from ex
