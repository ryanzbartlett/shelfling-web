import { ApiService } from './apiService';

export class ShelflingApi extends ApiService {
    constructor() {
        super(import.meta.env.VITE_API_BASE_URL, { tokenKey: 'shelfling_access' });
    }
}

export const shelflingApi = new ShelflingApi();
