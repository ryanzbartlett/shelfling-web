import type { CreateLibraryParams, Library } from '@/types/shelflingApi';
import { ApiService } from './apiService';

export class ShelflingApi extends ApiService {
    constructor() {
        super(import.meta.env.VITE_API_BASE_URL, { tokenKey: 'shelfling-access' });
    }

    async getLibraries(): Promise<Library[]> {
        const res = await this.client.get<ApiService.Resource<Library[]>>('/libraries', {
            requiresAuth: true,
        });
        return res.data.data;
        // TODO: Handle mocking
        // return new Promise(async (res) => {
        //     await new Promise((res) => setTimeout(res, 500));
        //     res(new LibraryFactory().createManySorted(5));
        // });
    }

    async createLibrary(params: CreateLibraryParams) {
        const res = await this.client.post<ApiService.Resource<Library>>(
            '/libraries',
            params,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async deleteLibrary(id: string) {
        await this.client.delete(`/libraries/${id}`, {
            requiresAuth: true,
        });
    }
}

export const shelflingApi = new ShelflingApi();
