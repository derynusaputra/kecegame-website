# KeceGame CMS Setup Guide

## Quick Start

This guide will help you get started with the Decap CMS setup for managing game content on the KeceGame website.

## What's Included

✅ **Decap CMS Installation** - Content management system installed and configured  
✅ **Game Management** - Complete game content management with rich fields  
✅ **Review System** - Game reviews with ratings and detailed analysis  
✅ **Image Management** - Organized media handling for game assets  
✅ **SEO Optimization** - Built-in SEO fields for better search visibility  
✅ **Sample Content** - Example games and reviews to get you started

## File Structure

```
├── src/app/(admin)/admin/cms/page.jsx    # CMS Admin Interface
├── content/
│   ├── games/                            # Game content files
│   │   └── sample-game.md               # Example game
│   └── reviews/                          # Review content files
│       └── sample-review.md             # Example review
├── public/images/games/                  # Game images directory
├── src/app/(client)/games/               # Game display pages
│   ├── page.jsx                         # Games listing page
│   └── [slug]/page.jsx                  # Individual game page
├── CMS_DOCUMENTATION.md                 # Detailed documentation
└── CMS_README.md                        # This file
```

## Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Access the CMS

Navigate to: `http://localhost:3000/admin/cms`

You'll see the Decap CMS interface with:

- **Games** collection for managing game content
- **Game Reviews** collection for managing reviews

### 3. Create Your First Game

1. Click "Games" in the sidebar
2. Click "New Game"
3. Fill in the required fields:
   - Title: "My Awesome Game"
   - Slug: "my-awesome-game"
   - Description: Detailed game description
   - Short Description: Brief description
   - Featured Image: Upload a game image
   - Category: Select from dropdown
   - Release Date: Set the release date
   - Developer: Game developer name
   - Publisher: Game publisher name
   - Age Rating: Select appropriate rating

4. Click "Save" to save as draft or "Publish" to make it live

### 4. View Your Content

- **Games List**: `http://localhost:3000/games`
- **Individual Game**: `http://localhost:3000/games/my-awesome-game`

## Key Features

### Game Management

- **Rich Content Fields**: Title, description, images, videos, screenshots
- **Game Details**: Developer, publisher, release date, age rating
- **Pricing**: Price and discount management
- **System Requirements**: Minimum and recommended specs
- **Platforms**: Multi-platform support
- **Categories & Tags**: Organized content classification
- **SEO Fields**: Custom titles and descriptions for search engines

### Review System

- **Game Association**: Link reviews to specific games
- **Rating System**: 1-10 rating scale
- **Detailed Analysis**: Pros, cons, and full review content
- **Reviewer Information**: Name and avatar support
- **Featured Reviews**: Highlight important reviews

### Media Management

- **Organized Storage**: Images stored in `public/images/games/`
- **Gallery Support**: Multiple images per game
- **Video Integration**: YouTube and other video platform support
- **Screenshot Management**: Organized game screenshots

## Content Types

### Games Collection

**Location**: `content/games/`  
**Fields**:

- Basic Info: Title, slug, descriptions
- Media: Featured image, gallery, videos, screenshots
- Game Details: Category, platforms, release date, developer, publisher
- Pricing: Price, discount percentage
- Requirements: System requirements (minimum/recommended)
- Features: List of game features
- SEO: Custom title and description
- Status: Featured and published flags

### Reviews Collection

**Location**: `content/reviews/`  
**Fields**:

- Game Association: Link to specific game
- Review Content: Title, content, rating
- Reviewer Info: Name, avatar
- Analysis: Pros and cons lists
- Status: Featured and published flags

## Sample Content

The setup includes sample content to help you understand the structure:

- **Sample Game**: Cyberpunk 2077 with complete information
- **Sample Review**: Detailed review with rating and analysis

## Customization

### Adding New Fields

To add new fields to games or reviews, edit the CMS configuration in:
`src/app/(admin)/admin/cms/page.jsx`

### Changing Categories

Update the category options in the CMS configuration:

```javascript
{
  label: 'Game Category',
  name: 'category',
  widget: 'select',
  options: [
    { label: 'Your Category', value: 'your-category' },
    // ... other options
  ],
}
```

### Adding Platforms

Update the platform options in the CMS configuration:

```javascript
{
  label: 'Platform',
  name: 'platform',
  widget: 'select',
  options: [
    { label: 'Your Platform', value: 'your-platform' },
    // ... other options
  ],
}
```

## Production Deployment

For production deployment, you'll need to:

1. **Set up Git Repository**: Host your content in a Git repository
2. **Configure Authentication**: Set up Git Gateway or other authentication
3. **Deploy to Hosting**: Use Netlify, Vercel, or similar platform
4. **Configure Backend**: Update the backend configuration for production

### Example Production Configuration

```javascript
backend: {
  name: 'git-gateway',
  branch: 'main',
  repo: 'your-username/your-repo',
}
```

## Troubleshooting

### Common Issues

1. **CMS not loading**
   - Check browser console for errors
   - Ensure Decap CMS is properly installed
   - Verify the admin page route

2. **Images not displaying**
   - Check image paths in content files
   - Verify images are in the correct directory
   - Ensure proper public folder configuration

3. **Content not saving**
   - Check all required fields are filled
   - Verify Markdown formatting
   - Check browser console for errors

### Getting Help

1. Check the detailed documentation: `CMS_DOCUMENTATION.md`
2. Review the [Decap CMS Documentation](https://decapcms.org/docs/)
3. Check the sample content files for reference

## Next Steps

1. **Customize the CMS**: Add your own fields and configurations
2. **Create Content**: Add your games and reviews
3. **Set up Authentication**: Configure for production use
4. **Deploy**: Set up hosting and deployment pipeline

## Support

For questions or issues:

- Review the documentation files
- Check the Decap CMS community
- Create an issue in the project repository

---

**Happy Content Managing!** 🎮

The CMS is now ready to use. Start by exploring the sample content and then create your own games and reviews.
