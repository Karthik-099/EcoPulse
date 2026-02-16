import cv2
import numpy as np
import requests
from PIL import Image
from io import BytesIO
from ultralytics import YOLO
import logging

logger = logging.getLogger(__name__)

class ImageVerifier:
    def __init__(self):
        try:
            self.model = YOLO('yolov8n.pt')
        except:
            logger.warning("YOLO model not found, using mock verification")
            self.model = None
        
        self.task_objects = {
            'PLANT_TREE': ['plant', 'tree', 'person', 'potted plant'],
            'WATER_PLANTS': ['plant', 'person', 'bottle', 'potted plant'],
            'PUBLIC_TRANSPORT': ['bus', 'train', 'person'],
            'BEACH_CLEANUP': ['person', 'bottle', 'bag', 'beach'],
            'RECYCLE': ['bottle', 'person', 'bin'],
            'REDUCE_PLASTIC': ['person', 'bag', 'bottle'],
            'BIKE_RIDE': ['bicycle', 'person'],
            'CARPOOL': ['car', 'person'],
            'OTHER': ['person']
        }
    
    async def verify(self, image_url: str, task_type: str):
        try:
            image = await self._download_image(image_url)
            
            if self.model:
                results = self.model(image)
                detected = self._extract_objects(results)
            else:
                detected = self._mock_detection(task_type)
            
            expected = self.task_objects.get(task_type, ['person'])
            confidence = self._calculate_confidence(detected, expected)
            
            return {
                "confidence": confidence,
                "detected_objects": detected
            }
        except Exception as e:
            logger.error(f"Verification error: {str(e)}")
            return {
                "confidence": 0.0,
                "detected_objects": []
            }
    
    async def analyze(self, image_url: str):
        try:
            image = await self._download_image(image_url)
            
            if self.model:
                results = self.model(image)
                detected = self._extract_objects(results)
            else:
                detected = ['person', 'object']
            
            return {
                "objects": detected,
                "count": len(detected)
            }
        except Exception as e:
            logger.error(f"Analysis error: {str(e)}")
            return {"objects": [], "count": 0}
    
    async def _download_image(self, url: str):
        response = requests.get(url, timeout=10)
        image = Image.open(BytesIO(response.content))
        return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    
    def _extract_objects(self, results):
        detected = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                class_name = result.names[class_id]
                detected.append(class_name)
        return detected
    
    def _calculate_confidence(self, detected: list, expected: list):
        if not detected:
            return 0.0
        
        matches = sum(1 for obj in detected if any(exp in obj.lower() for exp in expected))
        return min(matches / len(expected), 1.0)
    
    def _mock_detection(self, task_type: str):
        return self.task_objects.get(task_type, ['person'])[:2]
