import { shelflingApi } from '@/api/shelflingApi';
import { useQuery } from '@tanstack/vue-query';
import { unref, type MaybeRef } from 'vue';

export function useLibraryBooksQuery(libraryId: MaybeRef<string>) {
    return useQuery({
        queryKey: ['libraryBooks', unref(libraryId)],
        queryFn: () => shelflingApi.getLibraryBooks(unref(libraryId)),
    });
}
