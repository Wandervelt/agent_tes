from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
from app.routers import agents, vision, websocket
from app.config import settings

# Create FastAPI app
app = FastAPI(title="TechAssist AI Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

# Setup WebSocket handlers BEFORE creating the ASGI app
websocket.setup_websocket(sio)

# Create the ASGI app that combines FastAPI and Socket.IO
socket_app = socketio.ASGIApp(sio, app)

# Include routers
app.include_router(agents.router, prefix="/api")
app.include_router(vision.router, prefix="/api/vision")

@app.get("/")
async def root():
    return {"message": "TechAssist AI Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:socket_app", host="0.0.0.0", port=8000, reload=True)