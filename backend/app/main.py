from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.mongodb import connect_to_mongo, close_mongo_connection
from .websocket.manager import socket_app
from .api import auth, blood, donor, dtps, alert, public
from .config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174", 
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5177"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(blood.router, prefix="/api/blood", tags=["blood"])
app.include_router(donor.router, prefix="/api/donor", tags=["donor"])
app.include_router(dtps.router, prefix="/api/dtps", tags=["dtps"])
app.include_router(alert.router, prefix="/api/alert", tags=["alert"])
app.include_router(public.router, prefix="/api/public", tags=["public"])

# Mount Socket.io
app.mount("/socket.io", socket_app)

@app.get("/")
async def root():
    return {"message": "Welcome to LifeLink AI API"}
