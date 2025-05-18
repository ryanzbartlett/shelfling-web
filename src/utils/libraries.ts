import { LibraryUserRoles, type LibraryUserRole } from '@/types/shelflingApi';

export function getUserRoleText(role: LibraryUserRole): string {
    const roleMap = new Map<LibraryUserRole, string>();
    roleMap.set(LibraryUserRoles.Owner, 'Owner');
    roleMap.set(LibraryUserRoles.Editor, 'Editor');
    roleMap.set(LibraryUserRoles.Viewer, 'Viewer');

    const roleText = roleMap.get(role);

    return roleText ?? 'Unknown';
}
