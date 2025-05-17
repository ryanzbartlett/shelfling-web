# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
# Start development server with hot-reload
npm run dev

# Run type checking
npm run type-check

# Run linting with auto-fixes
npm run lint
```

### Testing

```bash
# Run all unit tests
npm run test:unit
```

### Production

```bash
# Build for production (includes type checking)
npm run build

# Preview production build
npm run preview
```

## Architecture

Shelfling is a media inventory application built with Vue 3 and TypeScript. The application follows a component-based architecture with strong typing.

### Key Technologies

- **Vue 3**: Using Composition API
- **TypeScript**: For type safety
- **Vue Router**: For navigation with auth guards
- **Pinia**: For state management
- **TanStack Vue Query**: For data fetching and caching
- **Zod**: For runtime data validation
- **Tailwind CSS**: For styling

### Core Structure

- **/src/api**: API services and data factories
  - `shelflingApi.ts`: Core API functions for communicating with backend
  - `/factories`: Data model factories

- **/src/components**: Reusable Vue components
  - Component files follow `.vue` extension with SFC pattern

- **/src/composables**: Reusable Vue composition functions
  - `useLibraries.ts`: Library management operations using Vue Query
  - `useShelflingApi.ts`: API access composable

- **/src/router**: Routing configuration
  - Combines public and authenticated routes with proper guards

- **/src/stores**: Pinia stores
  - `userStore.ts`: Manages authentication state

- **/src/types**: TypeScript type definitions
  - `shelflingApi.ts`: Core type definitions with Zod schemas
  - Defines key entities like Library types (Books, Movies) and user roles

- **/src/views**: Page-level components

### Data Models

- **Libraries**: Collections of media items with types (Books, Movies)
- **Library Users**: Users with different permission levels (Owner, Editor, Viewer)

### Authentication Flow

The application uses token-based authentication with the token stored as 'shelfling-access'. The user store manages authentication state and handles token storage/retrieval.

### API Patterns

The application uses a RESTful API pattern with composables that leverage TanStack Query for data fetching, caching, and cache invalidation. The API includes proper error handling and success callbacks for UI updates.