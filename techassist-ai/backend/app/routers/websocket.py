import socketio
from app.models.schemas import ChatRequest, ChatResponse
from app.services.agent_service import AgentService

agent_service = AgentService()

def setup_websocket(sio: socketio.AsyncServer):
    @sio.event
    async def connect(sid, environ):
        print(f"Client connected: {sid}")
        await sio.emit('connection_established', {'status': 'connected'}, to=sid)

    @sio.event
    async def disconnect(sid):
        print(f"Client disconnected: {sid}")
    
    @sio.event
    async def message(sid, data):
        print(f"Received message event from {sid}: {data}")
    
    @sio.on('chat_message')
    async def handle_chat_message(sid, data):
        print(f"Received chat message from {sid}: {data}")
        try:
            request = ChatRequest(**data)
            response = await agent_service.process_message(
                message=request.message,
                mode=request.mode,
                session_id=request.sessionId,
                image=request.image
            )
            print(f"Sending response to {sid}: {response.dict()}")
            await sio.emit('chat_response', response.dict(), to=sid)
        except Exception as e:
            print(f"Error processing message: {e}")
            await sio.emit('error', {'message': str(e)}, to=sid)