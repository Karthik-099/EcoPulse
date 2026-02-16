from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.image_verifier import ImageVerifier
from app.services.fraud_detector import FraudDetector
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="EcoPulse AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

image_verifier = ImageVerifier()
fraud_detector = FraudDetector()

class VerificationRequest(BaseModel):
    imageUrl: str
    taskType: str

class VerificationResponse(BaseModel):
    isValid: bool
    confidence: float
    detectedObjects: list
    fraudScore: float

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/verify", response_model=VerificationResponse)
async def verify_task(request: VerificationRequest):
    try:
        logger.info(f"Verifying task: {request.taskType}")
        
        verification_result = await image_verifier.verify(
            request.imageUrl,
            request.taskType
        )
        
        fraud_score = await fraud_detector.detect(request.imageUrl)
        
        is_valid = (
            verification_result["confidence"] > 0.7 and
            fraud_score < 0.3 and
            len(verification_result["detected_objects"]) > 0
        )
        
        return VerificationResponse(
            isValid=is_valid,
            confidence=verification_result["confidence"],
            detectedObjects=verification_result["detected_objects"],
            fraudScore=fraud_score
        )
    except Exception as e:
        logger.error(f"Verification failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-image")
async def analyze_image(request: VerificationRequest):
    try:
        result = await image_verifier.analyze(request.imageUrl)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
