# from motor.motor_asyncio import AsyncIOMotorClient
# from beanie import init_beanie
# import os
# from dotenv import load_dotenv

# load_dotenv()
# MONGO_URI = os.getenv("MONGODB_URI")
# client = AsyncIOMotorClient(MONGO_URI)
# db = client.get_default_database()

# async def init_db(models):
#     await init_beanie(database=db, document_models=models)

# backend/database.py
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DATABASE_NAME", "ruchi")

if not MONGO_URI:
    raise RuntimeError("MONGODB_URI is not set in environment")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Collections
users_coll = db["users"]
products_coll = db["products"]
orders_coll = db["orders"]
