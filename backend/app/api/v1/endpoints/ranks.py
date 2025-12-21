from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.db.session import get_db
from app.models.user import User
from app.models.game import GameRecord
from app.schemas.game import MyRankResponse
from app.schemas.game import MyRankResponse
from app.api import deps

router = APIRouter()

@router.get("/my", response_model=MyRankResponse)
async def get_my_rank(
    current_user: User = Depends(deps.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # 1. Get my best record
    result = await db.execute(
        select(func.min(GameRecord.clear_time_ms))
        .where(GameRecord.user_id == current_user.id)
    )
    my_best_time = result.scalar()

    if my_best_time is None:
        return {"rank": 0, "record": "0.00"}

    # 2. Calculate rank
    subquery = (
        select(
            GameRecord.user_id, 
            func.min(GameRecord.clear_time_ms).label("best_time")
        )
        .group_by(GameRecord.user_id)
        .subquery()
    )
    
    query = select(func.count()).select_from(subquery).where(subquery.c.best_time < my_best_time)
    result = await db.execute(query)
    better_count = result.scalar()
    rank = better_count + 1

    return {
        "rank": rank,
        "record": f"{my_best_time / 1000:.2f}"
    }

from typing import List
from app.schemas.ranking import RankingItem, RankingListResponse
from app.utils.masking import mask_name

@router.get("", response_model=RankingListResponse)
async def get_ranks(
    skip: int = 0,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    # 1. Base subquery for user best records
    subquery = (
        select(
            GameRecord.user_id,
            func.min(GameRecord.clear_time_ms).label("best_time"),
            func.max(GameRecord.played_at).label("last_played_at")
        )
        .group_by(GameRecord.user_id)
        .subquery()
    )

    # 2. Get total count
    count_query = select(func.count()).select_from(subquery)
    count_result = await db.execute(count_query)
    total = count_result.scalar()

    # 3. Get paginated results
    query = (
        select(subquery.c.user_id, subquery.c.best_time, subquery.c.last_played_at, User.name)
        .join(User, subquery.c.user_id == User.id)
        .order_by(subquery.c.best_time.asc())
        .offset(skip)
        .limit(limit)
    )

    result = await db.execute(query)
    rows = result.all()

    ranking_list = []
    for index, row in enumerate(rows):
        ranking_list.append({
            "rank": skip + index + 1,
            "userId": str(row.user_id),
            "name": mask_name(row.name),
            "record": f"{row.best_time / 1000:.2f}",
            "date": row.last_played_at.strftime("%Y-%m-%d") if row.last_played_at else ""
        })

    return {
        "items": ranking_list,
        "total": total
    }

