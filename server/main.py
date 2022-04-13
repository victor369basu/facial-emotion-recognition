import json
import io
import base64

from typing import Optional
from fastapi import FastAPI, WebSocket

import cv2
import numpy as np
from fer import FER

app = FastAPI()
detector = FER()

@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    #while True:
    try:
        payload = await websocket.receive_text()
        payload = json.loads(payload)
        imageByt64 = payload['data']['image'].split(',')[1]
        # decode and convert into image
        image = np.fromstring(base64.b64decode(imageByt64), np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        
        # Detect Emotion via Tensorflow model
        prediction = detector.detect_emotions(image)
        response = {
            "predictions": prediction[0]['emotions'],
            "emotion": max(prediction[0]['emotions'], key=prediction[0]['emotions'].get)
        }
        await websocket.send_json(response)
        websocket.close()
    except:
        websocket.close()