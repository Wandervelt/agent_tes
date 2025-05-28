from fastapi import APIRouter, HTTPException
from app.models.schemas import VisionRequest, VisionAnalysis
from app.services.vision_service import VisionService

router = APIRouter()
vision_service = VisionService()

@router.post("/analyze", response_model=VisionAnalysis)
async def analyze_image(request: VisionRequest):
    try:
        analysis = await vision_service.analyze_image(request.image)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))