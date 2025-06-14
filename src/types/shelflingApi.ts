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

const ExemplarConditions = {
    Fine: 0,
    New: 1,
    Used: 2,
    Refurbished: 3,
    Library: 4,
} as const;

type ExemplarCondition = typeof ExemplarConditions[keyof typeof ExemplarConditions];

const ExemplarConditionEnum = z.nativeEnum(ExemplarConditions);

const librarySchema = z.object({
    id: z.number(),
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
    exemplar_count: z.number().int().nonnegative(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

type LibraryBook = z.infer<typeof libraryBookSchema>;

const createLibraryBookParamsSchema = z.object({
    author: z.string(),
    title: z.string(),
});

type CreateLibraryBookParams = z.infer<typeof createLibraryBookParamsSchema>;

const exemplarSchema = z.object({
    id: z.number(),
    isbn: z.string().nullable(),
    condition: ExemplarConditionEnum,
    condition_details: z.string().nullable(),
    purchased_price: z.number().nullable(),
    purchased_details: z.string().nullable(),
    published_by: z.string().nullable(),
    published_date: z.string().datetime().nullable(),
    is_sold: z.boolean(),
    height: z.number().nullable(),
    width: z.number().nullable(),
    depth: z.number().nullable(),
    weight: z.number().nullable(),
    other_details: z.string().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    book_id: z.number(),
});

type Exemplar = z.infer<typeof exemplarSchema>;

type CreateExemplarParams = Partial<Omit<Exemplar,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'book_id'
>>;

export {
    LibraryTypes,
    LibraryTypeEnum,
    LibraryUserRoles,
    LibraryUserRoleEnum,
    ExemplarConditions,
    ExemplarConditionEnum,
    librarySchema,
    createLibraryParamsSchema,
    addLibraryUsersParamsSchema,
    libraryUserSchema,
    libraryBookSchema,
    createLibraryBookParamsSchema,
    exemplarSchema,

    type LibraryUserRole,
    type LibraryType,
    type ExemplarCondition,
    type Library,
    type CreateLibraryParams,
    type AddLibraryUsersParams,
    type LibraryUser,
    type LibraryBook,
    type CreateLibraryBookParams,
    type Exemplar,
    type CreateExemplarParams,
};
