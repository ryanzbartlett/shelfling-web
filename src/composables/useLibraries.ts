import { shelflingApi } from '@/api/shelflingApi';
import type { CreateLibraryParams, Library } from '@/types/shelflingApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

export function useLibraries() {
    return useQuery({
        queryKey: ['libraries'],
        queryFn: () => shelflingApi.getLibraries(),
    });
}

export function useLibrary(options?: {
    onCreateSuccess?: (data: Library) => void;
    onDeleteSuccess?: (id: string) => void;
}) {
    const queryClient = useQueryClient();

    const {
        mutate: createLibrary,
        isPending: createLibraryPending,
    } = useMutation({
        mutationFn: (params: CreateLibraryParams) => shelflingApi.createLibrary(params),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['libraries'] });
            options?.onCreateSuccess?.(data);
        },
    });

    const { mutate: deleteLibary } = useMutation({
        mutationFn: (id: string) => shelflingApi.deleteLibrary(id),
        onSuccess: (data, id) => {
            queryClient.invalidateQueries({ queryKey: ['libraries'] });
            options?.onDeleteSuccess?.(id);
        },
    });

    return {
        createLibrary,
        createLibraryPending,
        deleteLibary,
    };
}
