import { LibraryUserRoles } from '@/types/shelflingApi';
import type { Library } from '@/types/shelflingApi';

// Define permission actions for libraries
export enum LibraryAction {
    VIEW = 'view',
    EDIT = 'edit',
    DELETE = 'delete',
    MANAGE_USERS = 'manage_users',
    ASSIGN_OWNER = 'assign_owner',
}

// Define role-based permissions map
const libraryPermissions = {
    [LibraryUserRoles.Owner]: [
        LibraryAction.VIEW,
        LibraryAction.EDIT,
        LibraryAction.DELETE,
        LibraryAction.MANAGE_USERS,
        LibraryAction.ASSIGN_OWNER,
    ],
    [LibraryUserRoles.Editor]: [
        LibraryAction.VIEW,
        LibraryAction.EDIT,
    ],
    [LibraryUserRoles.Viewer]: [
        LibraryAction.VIEW,
    ],
};

export function usePermissions() {
    /**
   * Check if user has permission to perform an action on a library
   * @param library The library to check permissions for
   * @param action The action to check
   * @returns boolean indicating if the user has permission
   */
    const canPerformLibraryAction = (library: Library, action: LibraryAction): boolean => {
        if (!library || !library.role) {
            return false;
        }

        const userRole = library.role;
        const allowedActions = libraryPermissions[userRole] || [];

        return allowedActions.includes(action);
    };

    /**
   * Check if user can view a library
   */
    const canViewLibrary = (library: Library): boolean => {
        return canPerformLibraryAction(library, LibraryAction.VIEW);
    };

    /**
   * Check if user can edit a library
   */
    const canEditLibrary = (library: Library): boolean => {
        return canPerformLibraryAction(library, LibraryAction.EDIT);
    };

    /**
   * Check if user can delete a library
   */
    const canDeleteLibrary = (library: Library): boolean => {
        return canPerformLibraryAction(library, LibraryAction.DELETE);
    };

    /**
   * Check if user can manage users of a library
   */
    const canManageLibraryUsers = (library: Library): boolean => {
        return canPerformLibraryAction(library, LibraryAction.MANAGE_USERS);
    };

    /**
   * Check if user can assign owner role for a library
   */
    const canAssignLibraryOwner = (library: Library): boolean => {
        return canPerformLibraryAction(library, LibraryAction.ASSIGN_OWNER);
    };

    return {
        LibraryAction,
        canPerformLibraryAction,
        canViewLibrary,
        canEditLibrary,
        canDeleteLibrary,
        canManageLibraryUsers,
        canAssignLibraryOwner,
    };
}
