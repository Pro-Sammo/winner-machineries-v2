# Winner Machineries Website

A modern, responsive website for Winner Machineries with an admin dashboard for content management.

## Features

- **Modern Design**: Responsive design with beautiful UI/UX
- **Admin Dashboard**: Complete content management system
- **Product Management**: Add, edit, and manage products
- **Video Management**: Upload and manage videos
- **Gallery Management**: Image gallery with drag-and-drop upload
- **Hero Images**: Manage hero section images
- **Settings Management**: Comprehensive website configuration
- **SEO Integration**: Dynamic meta tags, sitemap, and analytics
- **Maintenance Mode**: Professional maintenance page
- **Cloudinary Integration**: Direct image upload to cloud storage

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MongoDB with Mongoose
- **Image Storage**: Cloudinary
- **Authentication**: Custom admin authentication
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB database
- Cloudinary account (for image uploads)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd winner-machineries-redesign
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```

4. **Database Setup**
   - Ensure your MongoDB database is running
   - The application will automatically create necessary collections

## Running the Application

### Development Mode

**Option 1: Using npm**
```bash
npm run dev
```

**Option 2: Using the PowerShell script (Windows)**
```bash
.\dev.ps1 dev
```

**Option 3: Using the PowerShell script with other commands**
```bash
.\dev.ps1 help          # Show available commands
.\dev.ps1 cache         # Clear Next.js cache
.\dev.ps1 clean         # Clean install
```

### Production Build

```bash
npm run build
npm start
```

## Access Points

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Admin Login**: http://localhost:3000/admin/login

## Admin Dashboard Features

### Content Management
- **Products**: Add, edit, delete products with images
- **Videos**: Upload and manage video content
- **Gallery**: Drag-and-drop image upload to gallery
- **Hero Images**: Manage hero section images
- **Settings**: Configure website settings

### Settings Categories
1. **General Settings**: Site information, system settings
2. **Contact Settings**: Company details, addresses, emails
3. **Social Media**: Social platform links
4. **SEO Settings**: Meta tags, analytics, tracking
5. **Notification Settings**: Email notification preferences

### SEO Integration
- Dynamic meta tags application
- Google Analytics integration
- Google Tag Manager support
- Facebook Pixel integration
- Dynamic sitemap generation
- Dynamic robots.txt

## File Structure

```
winner-machineries-redesign/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
├── models/               # MongoDB models
├── public/               # Static assets
└── styles/               # Global styles
```

## API Endpoints

### Admin APIs
- `GET/PUT /api/admin/settings` - Settings management
- `GET/POST/PUT/DELETE /api/admin/products` - Product management
- `GET/POST/PUT/DELETE /api/admin/videos` - Video management
- `GET/POST/PUT/DELETE /api/admin/gallery` - Gallery management
- `GET/POST/PUT/DELETE /api/admin/hero-images` - Hero images management

### Public APIs
- `GET /api/settings` - Public settings
- `GET /api/products` - Public products
- `GET /api/videos` - Public videos
- `GET /api/gallery` - Public gallery
- `GET /api/hero-images` - Public hero images
- `GET /robots.txt` - Dynamic robots.txt
- `GET /sitemap.xml` - Dynamic sitemap

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
- Ensure MongoDB is running
- Check your MONGODB_URI in .env.local
- Verify network connectivity

**2. Build Errors**
- Clear cache: `.\dev.ps1 cache`
- Clean install: `.\dev.ps1 clean`
- Check for dependency conflicts

**3. Image Upload Issues**
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper file formats

**4. Admin Login Issues**
- Check admin credentials in .env.local
- Clear browser cache
- Try different browser

### Development Commands

```bash
# Clear Next.js cache
.\dev.ps1 cache

# Clean install
.\dev.ps1 clean

# Install dependencies
.\dev.ps1 install

# Start development server
.\dev.ps1 dev
```

## Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_production_password
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support and questions:
- Check the troubleshooting section
- Review the settings guide (SETTINGS_GUIDE.md)
- Check the Cloudinary setup guide (CLOUDINARY_SETUP.md)

## License

This project is proprietary software for Winner Machineries. 