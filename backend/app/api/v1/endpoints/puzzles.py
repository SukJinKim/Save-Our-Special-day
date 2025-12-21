from fastapi import APIRouter, HTTPException, Depends
from app.api import deps
from app.models.user import User
from app.core.s3 import create_presigned_url, list_objects
import random

router = APIRouter()

@router.get("/image")
async def get_puzzle_image(current_user: User = Depends(deps.get_current_user)):
    """
    Get a random puzzle image URL from S3 (valid for 5 minutes)
    """
    objects = list_objects()
    if not objects:
        raise HTTPException(status_code=404, detail="퍼즐 이미지를 찾을 수 없습니다.")
    
    # Filter for image files
    image_files = [
        obj['Key'] for obj in objects 
        if obj['Key'].lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
    ]
    
    if not image_files:
        raise HTTPException(status_code=404, detail="퍼즐 이미지를 찾을 수 없습니다.")
    
    # Select random image
    selected_image = random.choice(image_files)
    
    # Generate presigned URL (valid for 5 minutes = 300 seconds)
    url = create_presigned_url(selected_image, expiration=300)
    
    if not url:
        raise HTTPException(status_code=500, detail="퍼즐 이미지 URL 생성에 실패했습니다.")
        
    return {"url": url}
