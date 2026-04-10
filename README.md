# 💬 Realtime Chat Application API (Next.js 15 + MongoDB)

A complete backend API system for a real-time chat application built with Next.js 15 (App Router). Features include Admin/User role management, self-destructing "View Once" image messages, and real-time updates via Pusher.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB (Mongoose ODM)
- **Realtime**: Pusher (Websockets)
- **Authentication**: Cookie-based Session (HTTP-only)
- **Validation**: Zod
- **Storage**: Cloudinary (Image uploads)
- **UI**: Tailwind CSS + shadcn/ui

## 📁 Project Structure

```
├── DESIGN.md                          # Design system documentation
├── README.md                          # This file
├── app/
│   ├── (auth)/                        # Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   └── register/
│   │       └── page.tsx              # Registration page
│   ├── admin-secret-route/            # Admin dashboard
│   │   └── page.tsx                  # Admin interface
│   ├── api/                          # API routes
│   │   ├── admin/                    # Admin-specific APIs
│   │   │   ├── login/
│   │   │   │   └── route.ts         # Admin login
│   │   │   └── rooms/
│   │   │       └── route.ts         # Get all rooms (admin)
│   │   ├── login/
│   │   │   └── route.ts             # User login
│   │   ├── logout/
│   │   │   └── route.ts             # Logout
│   │   ├── me/
│   │   │   └── route.ts             # Get current user
│   │   ├── messages/                 # Message management
│   │   │   ├── [id]/                # Message by ID
│   │   │   │   ├── once-viewed/
│   │   │   │   │   └── route.ts    # View once images
│   │   │   │   └── route.ts        # Delete message
│   │   │   ├── route.ts             # Get/send messages
│   │   │   └── seen/
│   │   │       └── route.ts        # Mark as seen
│   │   ├── register/
│   │   │   └── route.ts             # User registration
│   │   ├── rooms/                    # Room management
│   │   │   ├── route.ts             # Get user rooms
│   │   │   └── start/
│   │   │       └── route.ts         # Start new room
│   │   ├── upload/
│   │   │   └── route.ts             # Image upload
│   │   └── users/                    # User management
│   │       ├── heartbeat/
│   │       │   └── route.ts         # Update lastActive
│   │       ├── route.ts             # Get all users (admin)
│   │       └── search/
│   │           └── route.ts         # Search users
│   ├── error.tsx                     # Global error boundary
│   ├── favicon.ico                   # Favicon
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   ├── loading.tsx                   # Global loading
│   ├── not-found.tsx                 # 404 page
│   └── page.tsx                      # Home page (user chat)
├── components/
│   ├── admin/                        # Admin components
│   │   ├── admin-room-list.tsx      # Room list for admin
│   │   └── admin-user-list.tsx      # User list for admin
│   ├── auth/                        # Authentication components
│   │   ├── auth-form.tsx            # Login/register form
│   │   └── logout-button.tsx        # Logout button
│   ├── chat/                        # Chat components
│   │   ├── chat-container.tsx       # Main chat container
│   │   ├── chat-input.tsx           # Message input
│   │   ├── conversation-list.tsx    # Room list
│   │   ├── message-item.tsx         # Individual message
│   │   ├── once-image-modal.tsx     # View once modal
│   │   ├── seen-indicator.tsx       # Seen status indicator
│   │   └── user-search.tsx          # User search
│   ├── layout/                      # Layout components
│   │   └── header.tsx               # App header
│   ├── mode/                        # Theme components
│   │   └── mode-toggle.tsx          # Dark/light toggle
│   ├── providers/                   # Context providers
│   │   └── theme-provider.tsx       # Theme provider
│   └── ui/                          # shadcn/ui components
│       ├── avatar.tsx               # Avatar component
│       ├── badge.tsx                # Badge component
│       ├── button.tsx               # Button component
│       ├── card.tsx                 # Card component
│       ├── dropdown-menu.tsx        # Dropdown menu
│       ├── input.tsx                # Input component
│       ├── label.tsx                # Label component
│       ├── scroll-area.tsx          # Scrollable area
│       ├── separator.tsx            # Separator
│       ├── sheet.tsx                # Sheet (mobile drawer)
│       └── tabs.tsx                 # Tabs component
├── components.json                  # shadcn/ui configuration
├── context/                         # React contexts
│   └── AuthContext.tsx             # Authentication context
├── eslint.config.mjs               # ESLint configuration
├── hooks/                          # Custom React hooks
│   ├── use-chat.tsx                # Chat state management
│   └── useHeartbeat.ts             # User activity heartbeat
├── lib/                            # Utility libraries
│   ├── client.ts                   # MongoDB client
│   ├── server.ts                   # Server utilities
│   └── utils.ts                    # General utilities
├── middleware.ts                   # Next.js middleware
├── models/                         # Database models
│   ├── Message.ts                  # Message model
│   └── User.ts                     # User model
├── next-env.d.ts                   # Next.js TypeScript
├── next.config.ts                  # Next.js configuration
├── package-lock.json               # Dependencies lock
├── package.json                    # Project dependencies
├── postcss.config.mjs              # PostCSS configuration
├── public/                         # Static assets
│   ├── favicon/                    # Favicon assets
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── site.webmanifest
│   └── main_bg.jpg                 # Background image
└── tsconfig.json                   # TypeScript configuration
```

## 🛠️ API Structure

### 1. Authentication

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| POST   | `/api/register`    | Register a new user (regular user) |
| POST   | `/api/login`       | Login for regular users            |
| POST   | `/api/admin/login` | Login for admin users              |
| POST   | `/api/logout`      | Logout and clear session cookie    |
| GET    | `/api/me`          | Get current user info from session |

### 2. Message Management

| Method | Endpoint                         | Description                                          |
| ------ | -------------------------------- | ---------------------------------------------------- |
| GET    | `/api/messages`                  | Get messages by roomId (Cursor Pagination supported) |
| POST   | `/api/messages`                  | Send new message (Text or Image)                     |
| DELETE | `/api/messages/[id]`             | Soft delete message. Updates realtime lastMessage    |
| POST   | `/api/messages/seen`             | Mark all messages in a room as seen                  |
| POST   | `/api/messages/[id]/once-viewed` | Handle "View Once" image logic                       |

### 3. Rooms & Users Management

| Method | Endpoint               | Description                                 |
| ------ | ---------------------- | ------------------------------------------- |
| GET    | `/api/rooms`           | Get recent conversations for current user   |
| POST   | `/api/rooms/start`     | Start a private chat room between two users |
| GET    | `/api/users/search`    | Search users by username or ID              |
| POST   | `/api/users/heartbeat` | Update user's active status (lastActive)    |
| POST   | `/api/upload`          | Upload image to Cloudinary                  |

### 4. Admin Dashboard

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| GET    | `/api/admin/rooms` | Get all chat rooms in the system |
| GET    | `/api/users`       | Manage all users in the system   |

## ✨ Key Features

### 🔐 Security & Authorization
- **Cookie Security**: Uses `httpOnly`, `secure`, and `sameSite: strict` for session protection
- **Isolation**: Admin users cannot join regular user's private chat rooms (except for system logs)
- **Validation**: ObjectId format validation and message length limits (160 chars for users)

### 📸 "View Once" Image Mode
- Supports `imageMode: "once"`
- Senders cannot mark their own images as "viewed"
- Admins can only view these images within internal admin chat rooms
- Uses MongoDB's `$addToSet` to store unique viewer lists

### ⚡ Realtime Events (Pusher)
System emits the following key events:
- `new-message`: When a new message is sent
- `messages-seen`: When a user opens a chat room
- `rooms-updated`: Updates room list in sidebar
- `message-deleted`: When a message is deleted
- `user-online`: Notifies admin dashboard of user activity status

### 📝 Room ID Rules
Flexible Room ID generation logic:
- **Personal room**: `room-userId`
- **Private chat room**: `userId1-userId2` (sorted alphabetically for uniqueness)

## 🚀 Installation

### Environment Setup
Create a `.env` file with the following variables:

```env
MONGODB_URI=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXTAUTH_SECRET=
```

### Install Dependencies
```bash
npm install
```

### Run the Application
```bash
npm run dev
```

## 📂 Core Data Structure (Mongoose Models)

**User**: `username`, `password`, `isAdmin`, `lastActive`

**Message**: `roomId`, `userId`, `text`, `imageUrl`, `imageMode`, `seenBy[]`, `onceViewedBy[]`, `deleted`

**Note**: This system requires a `utils.ts` file containing `getParticipantsFromRoomId` and `getPrivateRoomId` functions for proper operation.

## 🎨 Design System

The application follows the **Shadcn/UI Design System** with:
- **WCAG AA Compliant Colors**: High contrast color schemes for accessibility
- **Mobile First Approach**: Optimized for iOS/Safari with dynamic viewport units
- **Consistent Components**: Using shadcn/ui component library
- **Dark/Light Mode**: Full theme support with system preference detection

See [DESIGN.md](DESIGN.md) for detailed design specifications.

## 📱 Pages Overview

### User Interface (`app/page.tsx`)
- Main chat interface with sidebar navigation
- Real-time message updates
- User search and room creation
- Mobile-responsive design with smooth transitions

### Admin Dashboard (`app/admin-secret-route/page.tsx`)
- Monitoring all chat rooms in real-time
- User management interface
- Read-only chat viewing for oversight
- Tab-based navigation for different admin functions

### Authentication Pages (`app/(auth)/`)
- Login and registration forms
- Separate admin login flow
- Automatic redirect based on user role

## 🔧 Development

### Key Hooks
- `use-chat.tsx`: Manages global chat state and Pusher subscriptions
- `useHeartbeat.ts`: Updates user activity status every 30 seconds

### Context Providers
- `AuthContext.tsx`: Manages authentication state across the application
- `ThemeProvider.tsx`: Provides theme context for dark/light mode

### Middleware
- Authentication protection for routes
- Admin role verification
- Session management and lastActive updates

## 📄 License

This project is proprietary software. All rights reserved.

---