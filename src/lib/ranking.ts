import { api } from '@/lib/api';

export interface RankItem {
    rank: number;
    name: string;
    record: string; // "MM:SS.ms" or similar string format from server, or we format it. PRD says string.
    userId: string;
}

export interface MyRankResponse {
    rank: number;
    record: string;
}

export interface RankingListResponse {
    items: RankItem[];
    total: number;
}

export const getRankings = async (skip: number = 0, limit: number = 10): Promise<RankingListResponse> => {
    const response = await api.get<RankingListResponse>('/ranks', { params: { skip, limit } });
    return response.data;
};

export const getMyRank = async (): Promise<MyRankResponse> => {
    const response = await api.get<MyRankResponse>('/ranks/my');
    return response.data;
};
