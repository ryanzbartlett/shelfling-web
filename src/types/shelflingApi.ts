import { z } from 'zod';

const LibraryTypes = {
    Book: 1,
    Movie: 2,
} as const;

const LibraryTypeEnum = z.nativeEnum(LibraryTypes);

const LibraryUserRoles = {
    Owner: 1,
    Editor: 2,
    Viewer: 3,
} as const;

type LibraryUserRole = typeof LibraryUserRoles[keyof typeof LibraryUserRoles];

const LibraryUserRoleEnum = z.nativeEnum(LibraryUserRoles);

const librarySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(255),
    type: LibraryTypeEnum,
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    role: LibraryUserRoleEnum,
});

type LibraryType = z.infer<typeof LibraryTypeEnum>;

type Library = z.infer<typeof librarySchema>;

const createLibraryParamsSchema = z.object({
    name: z.string().min(1).max(255),
    type: LibraryTypeEnum,
});

type CreateLibraryParams = z.infer<typeof createLibraryParamsSchema>;

const addLibraryUsersParamsSchema = z.object({
    users: z.array(z.object({
        email: z.string().email(),
        role: LibraryUserRoleEnum,
    })),
});

type AddLibraryUsersParams = z.infer<typeof addLibraryUsersParamsSchema>;

const libraryUserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    role: LibraryUserRoleEnum,
});

type LibraryUser = z.infer<typeof libraryUserSchema>;

const libraryBookSchema = z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

type LibraryBook = z.infer<typeof libraryBookSchema>;

export {
    LibraryTypes,
    LibraryTypeEnum,
    LibraryUserRoles,
    LibraryUserRoleEnum,
    librarySchema,
    createLibraryParamsSchema,
    addLibraryUsersParamsSchema,
    libraryUserSchema,
    libraryBookSchema,

    type LibraryUserRole,
    type LibraryType,
    type Library,
    type CreateLibraryParams,
    type AddLibraryUsersParams,
    type LibraryUser,
    type LibraryBook,
};
