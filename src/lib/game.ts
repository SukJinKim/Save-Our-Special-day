import { api } from '@/lib/api';

export interface GameRecordResponse {
    success: boolean;
    rank: number;
}

export const recordGame = async (clearTimeMs: number): Promise<GameRecordResponse> => {
    const response = await api.post<GameRecordResponse>('/games/record', { clearTimeMs });
    return response.data;
};
