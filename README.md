# Moderation Queue Interface

A responsive React-based application for content moderators to efficiently review user-submitted content and take appropriate actions.

##  Features

### Required Features 
- **Post List View**: Clean, scannable list format with post details
- **Individual Post Actions**: Approve/Reject buttons with visual feedback
- **Content Preview Modal**: Full post content view with navigation
- **Batch Operations**: Multi-select with checkboxes and batch actions
- **State Management**: Zustand for efficient state handling

### Nice-to-Have Features 
- **Status Filtering**: Tab-based navigation (Pending/Approved/Rejected)
- **Confirmation Dialogs**: Confirmation before rejection with reason input
- **Responsive Design**: Works seamlessly on desktop and tablet

### Bonus Features 
- **Keyboard Shortcuts**: 
  - `A` - Approve selected/focused post
  - `R` - Reject selected/focused post  
  - `Space` - Open content preview modal
  - `Escape` - Close modal/deselect items
- **Undo Functionality**: Toast notifications with undo capability
- **Advanced UI/UX**: Smooth animations, loading states, accessibility features

##  Tech Stack

- **Frontend**: React 18 with Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

##  Project Structure

```
src/
├── components/
│   ├── ModerationQueue.jsx      # Main container component
│   ├── PostList.jsx             # Post list container
│   ├── PostItem.jsx             # Individual post component
│   ├── PostModal.jsx            # Post detail modal
│   ├── StatusTabs.jsx           # Filter tabs component
│   ├── BatchActions.jsx         # Batch operations bar
│   ├── ConfirmationDialog.jsx   # Confirmation dialog
│   ├── Toast.jsx                # Toast notifications
│   └── EmptyState.jsx           # Empty state component
├── store/
│   └── moderationStore.js       # Zustand store
├── data/
│   └── mockData.js              # Sample data
├── utils/
│   ├── dateUtils.js             # Date formatting utilities
│   └── badgeUtils.jsx           # Badge components
├── App.jsx                      # Root component
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moderation-queue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

##  Usage

### Basic Operations
1. **Review Posts**: Click on any post to view full details in the modal
2. **Approve/Reject**: Use individual buttons or batch operations
3. **Filter Posts**: Use tabs to filter by status (Pending/Approved/Rejected)
4. **Select Multiple**: Use checkboxes to select multiple posts for batch operations

### Keyboard Shortcuts
- **A**: Approve selected posts
- **R**: Reject selected posts  
- **Space**: Open preview modal for single selected post
- **Escape**: Close modal or clear selection
- **Arrow Keys**: Navigate between posts in modal

### Batch Operations
1. Select posts using checkboxes
2. Use "Select All" to select all visible posts
3. Apply batch approve/reject actions
4. Clear selection when done

##  Configuration

The app uses mock data defined in `src/data/mockData.js`. In a real application, this would be replaced with API calls.

### Sample Data Structure
```javascript
{
  id: "post_123",
  title: "Sample Post Title",
  content: "Full post content here...",
  author: {
    username: "user123",
    id: "user_456"
  },
  reportedReason: "Spam",
  reportedAt: "2025-06-27T10:30:00Z",
  status: "pending", // pending, approved, rejected
  reportCount: 3
}
```

##  Design Principles

- **Clean & Professional**: Minimalist design focused on functionality
- **Responsive**: Works on desktop and tablet devices
- **Accessible**: Proper ARIA labels, keyboard navigation, focus management
- **Performant**: Efficient rendering and state management
- **User-Friendly**: Clear visual hierarchy and intuitive interactions

##  Testing

The application includes comprehensive error handling and edge case management:
- Empty states for all filter types
- Loading states during operations
- Error handling for failed operations
- Proper form validation
- Keyboard accessibility

##  Deployment

The app is ready for deployment to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the build output

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

##  License

This project is created as part of a technical assignment.

---

**Time Investment**: Completed within the 2-day requirement with full feature implementation and polished user experience.