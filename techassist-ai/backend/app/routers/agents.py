from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.services.agent_service import AgentService

router = APIRouter()
agent_service = AgentService()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = await agent_service.process_message(
            message=request.message,
            mode=request.mode,
            session_id=request.sessionId,
            image=request.image
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))