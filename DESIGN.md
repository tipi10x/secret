```markdown README.md
# 🎨 Design System - Shadcn/UI Design System

## 1. Design Philosophy: "Shadcn/UI Design System"
The system follows the shadcn/ui design style (ui.shadcn.com) with a consistent component system, systematic spacing, and a diverse color palette while maintaining high contrast.

**Core Principles:**
- **Consistency:** Uses shadcn/ui's design tokens and component library to ensure a uniform user experience.
- **High Contrast:** Ensures sharp, readable text in both Light and Dark modes, meeting WCAG AA standards.
- **Structural Clarity:** Uses systematic borders, shadows, and spacing to create information hierarchy and interface depth.
- **Accessibility:** Prioritizes accessible design with complete focus, hover, and active states.

## 2. Mobile First & iOS Optimization Strategy
To ensure smooth operation on iPhones and overcome Safari limitations:

### 2.1. Safari Search Bar Solution
Safari often changes viewport size when the address bar appears/disappears. We handle this with:
- **Dynamic Units:** Use `height: 100dvh` instead of `100vh` so containers always match the actual display space.
- **Safe Area:** Use `env(safe-area-inset-bottom)` for Chat Input to avoid being covered by iOS system navigation bars.

### 2.2. Preventing Auto-Zoom
- **Typography:** All inputs and textareas must have a minimum `font-size` of `16px`. This prevents Safari from automatically zooming when users tap input fields.

### 2.3. Touch & Gestures
- **Touch Targets:** Functional buttons (send, delete, upload) have minimum touch target sizes of `44x44px`.
- **Bouncing Effect:** Disable `overscroll-behavior` on body to prevent full-page "bounce" scrolling, maintaining a solid Native app feel.

## 3. Color Palette - Shadcn/UI Style
### Core Colors - Ensuring WCAG AA Contrast
| Mode  | Background                | Foreground                | Primary (Brand)                    | Secondary                      |
| ----- | ------------------------- | ------------------------- | ---------------------------------- | ------------------------------ |
| Light | `oklch(1 0 0)` (White)    | `oklch(0.15 0 0)` (Black) | `oklch(0.6 0.2 250)` (Blue)        | `oklch(0.97 0 0)` (Light Gray) |
| Dark  | `oklch(0.15 0 0)` (Black) | `oklch(0.98 0 0)` (White) | `oklch(0.7 0.2 250)` (Bright Blue) | `oklch(0.25 0 0)` (Dark Gray)  |

### Semantic States - Shadcn/UI Style
Use standard shadcn/ui colors for clear action indication:
- **Success:** `oklch(0.62 0.19 149)` (Green - Online/Success)
- **Warning:** `oklch(0.8 0.18 75)` (Orange-Yellow - Warning)
- **Destructive:** `oklch(0.58 0.22 25)` (Red - Delete/Error)
- **Muted:** `oklch(0.97 0 0)` (Light) / `oklch(0.25 0 0)` (Dark) - For secondary text
- **Accent:** `oklch(0.95 0.05 250)` (Light) / `oklch(0.3 0.05 250)` (Dark) - For hover states

### Border & Input
- **Border:** `oklch(0.92 0 0)` (Light) / `oklch(0.3 0 0)` (Dark)
- **Input:** `oklch(0.98 0 0)` (Light) / `oklch(0.2 0 0)` (Dark)
- **Ring:** Primary color with 50% opacity for focus states

## 4. UI Components - Shadcn/UI Style
### Chat Bubbles
- **Sent Messages:** Medium border radius (0.5rem), primary background, primary-foreground text, shadow-sm.
- **Received Messages:** Medium border radius (0.5rem), secondary background, secondary-foreground text, shadow-sm.
- **Feedback:** `hover:scale-[1.02]` and `active:scale-[0.98]` effects with transition-all.

### Cards & Containers
- **Card:** Card background, border, rounded-lg (0.5rem), shadow-sm.
- **Header:** Background/95 with backdrop-blur, border-b border-border.
- **Input Fields:** Rounded-md (0.375rem), border border-input, focus:ring-2 focus:ring-ring.

### Buttons
- **Primary:** bg-primary text-primary-foreground hover:bg-primary/90
- **Secondary:** bg-secondary text-secondary-foreground hover:bg-secondary/80
- **Outline:** border border-input bg-background hover:bg-accent hover:text-accent-foreground
- **Ghost:** hover:bg-accent hover:text-accent-foreground
- **Destructive:** bg-destructive text-destructive-foreground hover:bg-destructive/90

### "Once" Images (View Once)
- **Unopened:** Card with blur effect, border, and Eye-off icon.
- **Opening:** Fullscreen modal with backdrop-blur-md, background/95 backdrop.

## 5. Spacing & Typography System
### Border Radius
- `--radius-sm`: 0.25rem (4px)
- `--radius-md`: 0.375rem (6px)
- `--radius-lg`: 0.5rem (8px)
- `--radius-xl`: 0.75rem (12px)

### Spacing Scale (Tailwind)
- Use Tailwind's spacing scale: 0.25rem (4px) increments
- Container padding: 1rem (16px) on mobile, 1.5rem (24px) on desktop

### Typography
- **Font Family:** Inter or system font stack
- **Font Sizes:** Use scale: xs (0.75rem), sm (0.875rem), base (1rem), lg (1.125rem), xl (1.25rem)
- **Font Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 6. User Experience (UX Patterns)
- **Connection Status:** Badge with success color for online, outline for offline.
- **Transitions:** Use CSS transitions with duration-200 for state changes.
- **Loading:** Use shadcn/ui Skeleton components with pulse animation.
- **Empty States:** Card with icon and descriptive text, muted background.

## 7. Implementation Notes
- **CSS Variables:** Always use variables defined in `globals.css`. Avoid hard-coding color values.
- **Component Library:** Use components from `/components/ui` instead of creating styles from scratch.
- **Dark Mode:** Always test both Light and Dark modes, ensuring contrast meets standards.
- **Layout:** Use Tailwind's flexbox and grid system for responsive design.
- **Performance:** Optimize images through Cloudinary before displaying on mobile to save bandwidth.

## 8. Page Structure & Implementation

### 8.1. Main Chat Page (`app/page.tsx`)
**Layout Structure:**
- **Sidebar:** Fixed on mobile, responsive on desktop with smooth transitions
- **Main Chat Area:** Dynamic content area that shows either chat or empty state
- **Mobile Optimization:** Uses `useMediaQuery` hook for responsive behavior
- **Authentication:** Protected route with automatic redirect to login

**Key Features:**
- Real-time message updates via Pusher
- Room selection with participant information
- User search functionality
- Heartbeat system for tracking user activity
- Mobile-responsive sidebar with toggle functionality

### 8.2. Admin Dashboard (`app/admin-secret-route/page.tsx`)
**Layout Structure:**
- **Tab Navigation:** Monitoring and Users tabs for different admin functions
- **Split View:** Room list on left, chat monitoring on right (desktop)
- **Mobile Adaptation:** Collapsible chat view for mobile devices
- **Authentication:** Strict admin-only access with redirect protection

**Key Features:**
- Real-time monitoring of all chat rooms
- User management interface
- Read-only chat viewing for admin oversight
- Live view badges and status indicators

### 8.3. Global Styles (`app/globals.css`)
**Key Implementations:**
- **WCAG AA Compliant Colors:** High contrast color schemes for both light and dark modes
- **Dynamic Viewport Units:** Uses `dvh` for better mobile compatibility
- **iOS Optimization:** Safari-specific fixes for viewport and input issues
- **System Font Stack:** Ensures consistent typography across platforms
- **Border Radius System:** Consistent rounding across all components

## 9. Component Integration Examples

### Chat Container Integration
```tsx
<ChatContainer
  roomId={selectedRoomId}
  targetUser={targetUser}
  currentUser={user}
  messages={messages}
  setMessages={setMessages}
  loadMoreOlder={loadMoreOlder}
  hasMore={hasMore}
  loading={loading}
  loadingMore={loadingMore}
  onBack={handleBackToList}
/>
```

### Authentication Integration
```tsx
const { user, logout, loading: authLoading } = useAuth();
useEffect(() => {
  if (!authLoading && !user) router.replace("/login");
}, [user, authLoading, router]);
```

### Mobile Responsive Design
```tsx
const isMobile = useMediaQuery("(max-width: 767px)");
const isSidebarOpen = isMobile ? (selectedRoomId ? manualSidebarOpen : true) : true;
```

## 10. Performance Considerations
- **Code Splitting:** Components are lazy-loaded where appropriate
- **Image Optimization:** Cloudinary integration for responsive images
- **State Management:** Efficient chat state management with `useChat` hook
- **Realtime Updates:** Optimized Pusher event handling with channel subscriptions
- **Bundle Size:** Tree-shaking and component-level imports to reduce bundle size

## 11. Accessibility Features
- **Keyboard Navigation:** Full keyboard support for all interactive elements
- **Screen Reader Support:** ARIA labels and semantic HTML structure
- **Focus Management:** Proper focus trapping in modals and dialogs
- **Color Contrast:** WCAG AA compliant color combinations
- **Touch Targets:** Minimum 44x44px touch targets for mobile interactions

---

*This document defines design principles and implementation guidelines for the chat system following the Shadcn/UI Design System.*
```

I've updated the README.md with the design system section in English, incorporating insights from the three provided files. The update includes:

1. **Complete design philosophy** translated to English
2. **Mobile optimization strategies** based on the actual implementation
3. **Color system** with WCAG compliance details
4. **Component styling guidelines** following shadcn/ui patterns
5. **Implementation notes** from the actual code
6. **Page structure analysis** for both main pages
7. **Component integration examples** showing real usage patterns
8. **Performance considerations** based on the implementation
9. **Accessibility features** that are actually implemented

The design system section now accurately reflects what's implemented in the code while maintaining professional documentation standards.