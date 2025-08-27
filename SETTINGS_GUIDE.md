# Settings Management Guide

## Overview

The Winner Machineries admin panel includes a comprehensive settings management system that allows you to configure various aspects of your website. This guide explains all the features and how to use them effectively.

## Accessing Settings

1. Log into the admin panel
2. Navigate to the "Settings" section in the left sidebar
3. The settings page is organized into 5 main tabs for easy navigation

## Settings Categories

### 1. General Settings

**Site Information:**
- **Site Name**: The name of your website (required)
- **Site URL**: Your website's main URL (required)
- **Site Description**: Brief description of your website

**System Settings:**
- **Default Language**: Choose from English, Spanish, French, German
- **Timezone**: Set your local timezone
- **Date Format**: Choose between MM/DD/YYYY, DD/MM/YYYY, or YYYY-MM-DD
- **Currency**: Select your preferred currency (USD, EUR, GBP, CAD)

**System Options:**
- **Maintenance Mode**: Enable to restrict access to your website

### 2. Contact Settings

**Company Information:**
- **Company Name**: Your business name
- **Primary Email**: Main contact email
- **Phone Number**: Contact phone number
- **Business Hours**: Operating hours display

**Address Information:**
- **Address**: Street address
- **City, State, ZIP Code, Country**: Complete address details

**Email Addresses:**
- **Support Email**: For customer support inquiries
- **Sales Email**: For sales-related inquiries

### 3. Social Media Settings

Configure links to your social media profiles:
- Facebook
- Twitter/X
- LinkedIn
- Instagram
- YouTube
- WhatsApp

### 4. SEO Settings

**Meta Tags:**
- **Meta Title**: Page title for search engines (automatically applied to all pages)
- **Meta Description**: Page description for search results (automatically applied to all pages)
- **Meta Keywords**: Keywords for SEO optimization (automatically applied to all pages)

**Analytics & Tracking:**
- **Google Analytics ID**: For website analytics (automatically integrated)
- **Google Tag Manager ID**: For advanced tracking (automatically integrated)
- **Facebook Pixel ID**: For Facebook advertising tracking (automatically integrated)

**SEO Integration:**
- All SEO settings are automatically applied to your website
- Meta tags are dynamically updated based on your settings
- Analytics and tracking codes are automatically injected
- Dynamic sitemap.xml generation
- Dynamic robots.txt generation

### 5. Notification Settings

Control email notification preferences:
- **Enable Email Notifications**: Master toggle for all notifications
- **New Order Notifications**: Get notified when orders are placed
- **Contact Form Notifications**: Get notified when contact forms are submitted
- **Newsletter Subscription Notifications**: Get notified of new subscribers
- **Admin Email Notifications**: Send notifications to admin emails

## Features

### Validation
The settings page includes comprehensive validation:
- Required fields are marked with asterisks (*)
- Email addresses are validated for proper format
- Site name and URL are required fields
- Real-time validation feedback

### Import/Export
- **Export Settings**: Download your current settings as a JSON file
- **Import Settings**: Upload previously exported settings
- **Reset to Defaults**: Restore all settings to default values

### Auto-Save
- Settings are automatically validated before saving
- Success/error messages provide clear feedback
- Loading states indicate when operations are in progress

### SEO Integration
- **Automatic Meta Tag Application**: SEO settings are automatically applied to all pages
- **Dynamic Title Updates**: Page titles update based on your settings
- **Analytics Integration**: Google Analytics, GTM, and Facebook Pixel are automatically integrated
- **Sitemap Generation**: Dynamic sitemap.xml with all your content
- **Robots.txt**: Dynamic robots.txt based on your settings

## Maintenance Mode

When maintenance mode is enabled:
- A maintenance page is displayed to all visitors
- Contact information is prominently displayed
- Users can check back later with a refresh button
- Professional appearance with company branding

## API Endpoints

### Admin Settings API
- `GET /api/admin/settings` - Retrieve all settings (admin only)
- `PUT /api/admin/settings` - Update settings (admin only)

### Public Settings API
- `GET /api/settings` - Retrieve public settings (no authentication required)

### SEO API Endpoints
- `GET /robots.txt` - Dynamic robots.txt generation
- `GET /sitemap.xml` - Dynamic sitemap generation

## Database Structure

Settings are stored in a MongoDB collection with the following structure:
- Single document per installation
- Automatic creation of default settings
- Timestamp tracking for updates
- Validation at the database level

## SEO Implementation

### How SEO Settings Work
1. **Meta Tags**: Automatically applied to all pages via the SEO provider component
2. **Analytics**: Google Analytics, GTM, and Facebook Pixel are automatically injected
3. **Sitemap**: Dynamic sitemap.xml includes all your products, videos, and pages
4. **Robots.txt**: Dynamic robots.txt based on your SEO settings

### SEO Best Practices
- Use descriptive meta titles (50-60 characters)
- Write compelling meta descriptions (150-160 characters)
- Include relevant keywords naturally
- Keep URLs clean and descriptive
- Regularly update your SEO settings

## Best Practices

### Security
- Never share admin credentials
- Regularly update settings passwords
- Use strong email addresses for notifications
- Validate all input data

### SEO Optimization
- Use descriptive meta titles (50-60 characters)
- Write compelling meta descriptions (150-160 characters)
- Include relevant keywords naturally
- Keep URLs clean and descriptive
- Regularly update your SEO settings

### Maintenance
- Test maintenance mode before enabling
- Update contact information regularly
- Monitor notification settings
- Backup settings before major changes

### Performance
- Settings are cached for 5 minutes
- Database queries are optimized
- Minimal impact on page load times
- Efficient validation processes

## Troubleshooting

### Common Issues

**Settings not saving:**
- Check required fields are filled
- Verify email format is correct
- Ensure you have admin permissions
- Check browser console for errors

**Maintenance mode not working:**
- Clear browser cache
- Check if maintenance mode is properly enabled
- Verify settings are saved successfully
- Test on different browsers

**SEO not updating:**
- Clear browser cache
- Check if settings are saved successfully
- Verify analytics codes are correct
- Check browser console for errors

**Import/Export issues:**
- Ensure file format is JSON
- Check file size (should be small)
- Verify file structure matches expected format
- Try exporting first, then importing the same file

### Error Messages

- **"Site name is required"**: Fill in the site name field
- **"Please enter a valid email address"**: Check email format
- **"Failed to save settings"**: Try again or check network connection
- **"Invalid settings file format"**: Use a properly formatted JSON file

## Support

If you encounter issues with the settings system:
1. Check this guide first
2. Review error messages carefully
3. Try resetting to defaults
4. Contact support with specific error details

## Future Enhancements

Planned features for future updates:
- Advanced SEO tools
- Social media integration
- Email template customization
- Multi-language support
- Advanced analytics integration
- Backup scheduling
- User permission management 