import { api } from '@/lib/api';

export interface GameRecordResponse {
    success: boolean;
    rank: number;
}

export interface PuzzleImageResponse {
    url: string;
}

export const recordGame = async (clearTimeMs: number): Promise<GameRecordResponse> => {
    const response = await api.post<GameRecordResponse>('/games/record', { clearTimeMs });
    return response.data;
};

export const getPuzzleImage = async (): Promise<PuzzleImageResponse> => {
    const response = await api.get<PuzzleImageResponse>('/puzzles/image');
    return response.data;
};

export interface MyRankResponse {
    rank: number;
    record: string;
}

export const getMyRank = async (): Promise<MyRankResponse> => {
    const response = await api.get<MyRankResponse>('/ranks/my');
    return response.data;
};

export interface HiddenMessageResponse {
    messages: string[];
}

export const getHiddenMessages = async (): Promise<HiddenMessageResponse> => {
    const response = await api.get<HiddenMessageResponse>('/games/hidden-message');
    return response.data;
};

export interface GameHistoryItem {
    rank: number;
    record: string;
    date: string;
}

export interface GameHistoryResponse {
    items: GameHistoryItem[];
    total: number;
}

export const getMyGameHistory = async (
    skip = 0,
    limit = 10,
    sortBy: 'record' | 'date' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<GameHistoryResponse> => {
    const response = await api.get<GameHistoryResponse>('/games/history', {
        params: {
            skip,
            limit,
            sort_by: sortBy,
            order
        }
    });
    return response.data;
};
