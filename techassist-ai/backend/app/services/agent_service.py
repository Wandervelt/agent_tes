from typing import Optional
from openai import OpenAI
from app.models.schemas import ChatResponse
from app.config import settings
from app.services.vision_service import VisionService

class AgentService:
    def __init__(self):
        self.vision_service = VisionService()
        self.client = OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None

    async def process_message(
        self, 
        message: str, 
        mode: str, 
        session_id: str,
        image: Optional[str] = None
    ) -> ChatResponse:
        
        context = self._get_mode_context(mode)
        
        if image:
            vision_analysis = await self.vision_service.analyze_image(image)
            context += f"\n\nImage analysis: {vision_analysis.dict()}"
        
        # For demo purposes, using a simple response
        # In production, this would use LangGraph agents
        response = await self._generate_response(message, context, mode)
        
        return ChatResponse(
            message=response['message'],
            data=response.get('data'),
            suggestions=response.get('suggestions')
        )
    
    def _get_mode_context(self, mode: str) -> str:
        if mode == "pre-visit":
            return """You are an AI assistant helping a field service technician prepare for a service visit. 
            Provide information about equipment specifications, common issues, required tools, and safety considerations."""
        else:
            return """You are an AI assistant helping a field service technician on-site. 
            Help diagnose issues, provide step-by-step troubleshooting guidance, and identify equipment from photos."""
    
    async def _generate_response(self, message: str, context: str, mode: str) -> dict:
        # Use OpenAI to generate response
        if self.client:
            try:
                completion = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": context},
                        {"role": "user", "content": message}
                    ],
                    temperature=0.7
                )
                response_text = completion.choices[0].message.content
                
                # For specific equipment queries, add structured data
                if "carrier" in message.lower() and "24acb3" in message.lower():
                    return {
                        "message": response_text,
                        "data": {
                            "equipment_info": {
                                "model": "Carrier 24ACB3",
                                "type": "Air Conditioner",
                                "capacity": "3 tons"
                            }
                        }
                    }
                
                return {
                    "message": response_text,
                    "data": None,
                    "suggestions": None
                }
            except Exception as e:
                print(f"OpenAI API error: {e}")
                return {
                    "message": f"I understand you need help with: {message}. (API Error: {str(e)})",
                    "data": None,
                    "suggestions": None
                }
        else:
            return {
                "message": "OpenAI API key not configured. Please add your API key to the .env file.",
                "data": None,
                "suggestions": None
            }