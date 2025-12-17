import { api } from '@/lib/api';

export interface User {
    id: string;
    name: string;
    phone: string;
}

export interface SignInResponse {
    user: User;
    accessToken: string;
}

export const signIn = async (name: string, phone: string): Promise<SignInResponse> => {
    const response = await api.post<SignInResponse>('/auth/signin', { name, phone });
    return response.data;
};
