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

export const getRankings = async (limit: number = 10): Promise<RankItem[]> => {
    const response = await api.get<RankItem[]>('/ranks', { params: { limit } });
    return response.data;
};

export const getMyRank = async (): Promise<MyRankResponse> => {
    const response = await api.get<MyRankResponse>('/ranks/my');
    return response.data;
};
