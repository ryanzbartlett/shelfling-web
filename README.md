# Shelfling

Shelfling is a media inventory application that helps you organize and manage
your collections of books.

- [Project Setup](#project-setup)
- [Commands](#commands)
  - [Development](#development)
  - [Testing](#testing)
  - [Production](#production)
- [Architecture](#architecture)
  - [Key Technologies](#key-technologies)
  - [Core Structure](#core-structure)
  - [Data Models](#data-models)
  - [Authentication Flow](#authentication-flow)
- [Recommended IDE Setup](#recommended-ide-setup)

## Project Setup

```sh
npm install
```

## Commands

### Development

```sh
# Start development server with hot-reload
npm run dev

# Run type checking
npm run type-check

# Run linting with auto-fixes
npm run lint
```

### Testing

```sh
# Run all unit tests
npm run test:unit
```

### Production

```sh
# Build for production (includes type checking)
npm run build

# Preview production build
npm run preview
```

## Architecture

Shelfling follows a component-based architecture with strong typing.

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
- **/src/components**: Reusable Vue components
- **/src/composables**: Reusable Vue composition functions
- **/src/router**: Routing configuration
- **/src/stores**: Pinia stores
- **/src/types**: TypeScript type definitions
- **/src/views**: Page-level components

### Data Models

- **Libraries**: Collections of media items with types (Books, Movies)
- **Library Users**: Users with different permission levels (Owner, Editor,
  Viewer)

### Authentication Flow

The application uses token-based authentication with the token stored as
'shelfling-access'. The user store manages authentication state and handles
token storage/retrieval.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) +
[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable Vetur).
