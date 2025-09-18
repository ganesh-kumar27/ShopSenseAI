# ShopSense AI - Intelligent Clothing Shopping Platform

ShopSense AI is a modern, AI-powered clothing shopping platform that combines online product discovery with offline retail store experiences. Built with React, TypeScript, and Tailwind CSS, it offers personalized recommendations, image-based search, and seamless integration between digital and physical shopping.

## 🌟 Features

### 🔍 Smart Search & Discovery
- **Text Search**: Search for clothing items, brands, or styles with Enter-to-search functionality
- **AI Image Search**: Upload photos to find similar clothing items using AI-powered visual recognition
- **Occasion-Based Shopping**: Browse curated collections for specific events (Professional, Formal, Casual, Active, Seasonal)
- **Advanced Filters**: Filter by category, price, rating, brand, size, color, platform, and delivery time

### 🛍️ Personalized Shopping Experience
- **User Profiles**: Complete profile with measurements, style preferences, and favorite brands
- **Personalized Recommendations**: AI-driven product suggestions based on user preferences
- **Wishlist Management**: Save favorite items with price drop and stock alerts
- **Shopping Cart**: Full cart functionality with quantity management

### 🏪 Dual Mode Shopping
- **Online Mode**: Browse products from multiple e-commerce platforms (Myntra, Flipkart, Amazon, Meesho)
- **Offline Mode**: Discover nearby retail stores and custom tailoring services

### 🏬 Store & Tailor Discovery
- **Store Locator**: Find nearby clothing stores with ratings, reviews, and real-time hours
- **Video Consultations**: Book 15-minute video calls with store experts for personalized styling advice
- **Custom Tailoring**: Connect with verified professional tailors for bespoke clothing
- **Store Features**: View store amenities, promotions, and customer reviews

### 📱 Modern User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Beautiful UI**: Apple-level design aesthetics with smooth animations and micro-interactions
- **Dark/Light Themes**: Consistent color system with multiple theme support
- **Accessibility**: WCAG compliant with proper contrast ratios and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/shopsense-ai.git
   cd shopsense-ai
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
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Main navigation header
│   ├── ProductGrid.tsx # Product display grid
│   ├── StoresView.tsx  # Store discovery interface
│   ├── TailoringView.tsx # Tailor discovery interface
│   └── ...
├── data/               # Static data and mock APIs
│   ├── products.ts     # Product catalog
│   ├── stores.ts       # Store information
│   └── tailors.ts      # Tailor profiles
├── hooks/              # Custom React hooks
│   └── useSearch.ts    # Search and filtering logic
├── types/              # TypeScript type definitions
│   ├── Product.ts      # Product-related types
│   ├── Store.ts        # Store-related types
│   └── Tailor.ts       # Tailor-related types
└── App.tsx             # Main application component
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Fast build tool and development server

### UI/UX
- **Lucide React** - Beautiful, customizable icons
- **Responsive Design** - Mobile-first approach with breakpoints
- **CSS Grid & Flexbox** - Modern layout techniques
- **Smooth Animations** - CSS transitions and transforms

### State Management
- **React Hooks** - useState, useEffect, useMemo for local state
- **Custom Hooks** - Reusable logic for search and filtering
- **Context API** - For global state when needed

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Main brand color
- **Secondary**: Purple (#7c3aed) - Accent color
- **Success**: Green (#059669) - Positive actions
- **Warning**: Orange (#ea580c) - Caution states
- **Error**: Red (#dc2626) - Error states
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: System fonts for optimal performance
- **Font Weights**: 3 weights maximum (400, 500, 700)
- **Line Heights**: 150% for body text, 120% for headings

### Spacing
- **8px Grid System** - Consistent spacing throughout the app
- **Component Spacing**: Logical spacing between UI elements
- **Layout Margins**: Responsive margins for different screen sizes

## 🔧 Key Components

### Search & Discovery
- **ImageSearch**: AI-powered visual search component
- **SearchFilters**: Advanced filtering interface
- **OccasionMenu**: Occasion-based product discovery
- **ProductGrid**: Responsive product display

### Shopping Experience
- **ProductModal**: Detailed product view with size/color selection
- **ShoppingCart**: Cart management with quantity controls
- **WishlistPage**: Saved items with alert functionality
- **ProfilePage**: User profile and preferences

### Store Integration
- **StoresView**: Store discovery and filtering
- **StoreCard**: Individual store information display
- **TailoringView**: Custom tailor discovery
- **VideoCallBooking**: Video consultation scheduling

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🎯 User Experience Features

### Personalization
- Profile-based product recommendations
- Size and brand preference filtering
- Style preference matching
- Purchase history consideration

### Smart Features
- Real-time search suggestions
- Image-based product matching
- Price drop notifications
- Stock availability alerts
- Store hour validation

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Focus management
- ARIA labels and descriptions

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser caching for static assets
- **Lazy Loading**: On-demand component loading

## 🔮 Future Enhancements

### Planned Features
- **AI Styling Assistant**: Personal styling recommendations
- **AR Try-On**: Virtual fitting room experience
- **Social Shopping**: Share and discover with friends
- **Loyalty Program**: Rewards and points system
- **Multi-language Support**: Internationalization

### Technical Improvements
- **PWA Support**: Offline functionality and app-like experience
- **Real-time Notifications**: Push notifications for deals and updates
- **Advanced Analytics**: User behavior tracking and insights
- **API Integration**: Real e-commerce platform connections

## 🤝 Contributing

We welcome contributions to ShopSense AI! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add proper type definitions
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** - High-quality stock photos for product images
- **Lucide** - Beautiful icon library
- **Tailwind CSS** - Excellent utility-first CSS framework
- **React Team** - Amazing frontend framework
- **Vite Team** - Lightning-fast build tool

## 📞 Support

For support, email support@shopsense-ai.com or join our community Discord server.

---

**ShopSense AI** - Revolutionizing the way you discover and shop for clothing with the power of artificial intelligence.