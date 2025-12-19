from pydantic import BaseModel, ConfigDict
from typing import List

class RankingItem(BaseModel):
    rank: int
    name: str
    record: str
    date: str
    
    model_config = ConfigDict(from_attributes=True)

class RankingListResponse(BaseModel):
    items: List[RankingItem]
    total: int
