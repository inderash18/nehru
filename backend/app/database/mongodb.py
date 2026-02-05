from motor.motor_asyncio import AsyncIOMotorClient
from ..config import settings
import logging

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

db_instance = MongoDB()

async def connect_to_mongo():
    logging.info("Connecting to MongoDB...")
    db_instance.client = AsyncIOMotorClient(settings.MONGODB_URL)
    db_instance.db = db_instance.client[settings.DATABASE_NAME]
    logging.info("Connected to MongoDB!")

async def close_mongo_connection():
    logging.info("Closing MongoDB connection...")
    db_instance.client.close()
    logging.info("MongoDB connection closed!")

def get_database():
    return db_instance.db
