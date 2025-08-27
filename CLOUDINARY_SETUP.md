# Cloudinary Setup Guide

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## How to Get Cloudinary Credentials

1. **Sign up for Cloudinary**: Go to [cloudinary.com](https://cloudinary.com) and create a free account

2. **Get Cloud Name**: Your cloud name is displayed in your dashboard

3. **Get API Key and Secret**: 
   - Go to Dashboard → Settings → Access Keys
   - Copy your API Key and API Secret

4. **Create Upload Preset**:
   - Go to Dashboard → Settings → Upload
   - Scroll down to "Upload presets"
   - Click "Add upload preset"
   - Set signing mode to "Unsigned" for client-side uploads
   - Save the preset name

## Features Added

- ✅ Direct image upload to Cloudinary
- ✅ Automatic image optimization
- ✅ Secure cloud storage
- ✅ Image preview with alt text editing
- ✅ Remove image functionality
- ✅ Loading states during upload

## Usage

The image upload component is now integrated into:
- Hero Images add/edit pages
- Can be easily added to other forms

Simply click "Upload Image" and select your image file. It will be automatically uploaded to Cloudinary and the URL will be saved in your database. 