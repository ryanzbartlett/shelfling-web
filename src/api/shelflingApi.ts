import type { Library } from '@/types/shelflingApi';
import { ApiService } from './apiService';
import { LibraryFactory } from '@/api/factories/libraryFactory';

export class ShelflingApi extends ApiService {
    constructor() {
        super(import.meta.env.VITE_API_BASE_URL, { tokenKey: 'shelfling-access' });
    }

    async getLibraries(): Promise<Library[]> {
        return new Promise(async (res) => {
            await new Promise((res) => setTimeout(res, 500));
            res(new LibraryFactory().createManySorted(5));
        });
    }
}

export const shelflingApi = new ShelflingApi();
