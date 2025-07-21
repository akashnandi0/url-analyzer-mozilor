# url-analyzer

This application analyzes websites to find the most frequently used words.

## Configuration

Before starting, set the following environment variables:

```
DATABASE_URL = Your database connection string
JWT_SECRET_KEY = Your JWT secret key
```

## Running Locally

To run the application on your local machine:

1. Install Python 3.10 or newer.
2. Navigate to the `backend` directory.
3. Create a virtual environment.
4. Install dependencies from `requirements.txt` using pip.
5. Start the server with:
   ```
   uvicorn main:app --reload
   ```
