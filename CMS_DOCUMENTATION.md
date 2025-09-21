# Decap CMS Documentation for KeceGame Website

## Overview

This documentation explains how to use Decap CMS (formerly Netlify CMS) for managing game content on the KeceGame website. Decap CMS provides a user-friendly interface for content editors to manage games, reviews, and other content without needing technical knowledge.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Accessing the CMS](#accessing-the-cms)
3. [Content Types](#content-types)
4. [Game Management](#game-management)
5. [Review Management](#review-management)
6. [File Structure](#file-structure)
7. [Configuration](#configuration)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git repository set up
- Basic understanding of Markdown

### Installation

Decap CMS has been installed and configured in this project. The main files are:

- `src/app/(admin)/admin/cms/page.jsx` - CMS admin interface
- `content/` - Directory for content files
- `public/images/games/` - Directory for game images

## Accessing the CMS

### Local Development

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/cms`

3. You'll see the Decap CMS interface with options to manage games and reviews.

### Production Deployment

For production, you'll need to set up authentication. The CMS is configured to use Git Gateway, which requires:

1. A Git repository (GitHub, GitLab, or Bitbucket)
2. Netlify or similar hosting platform
3. Git Gateway authentication setup

## Content Types

The CMS is configured to manage two main content types:

### 1. Games Collection

Games are the main content type, containing detailed information about each game.

**Location**: `content/games/`
**File Format**: Markdown (.md)

### 2. Game Reviews Collection

Reviews provide detailed analysis and ratings for games.

**Location**: `content/reviews/`
**File Format**: Markdown (.md)

## Game Management

### Creating a New Game

1. In the CMS interface, click "Games" in the sidebar
2. Click "New Game"
3. Fill in the required fields:

#### Required Fields

- **Title**: The name of the game
- **Slug**: URL-friendly version (e.g., "my-awesome-game")
- **Description**: Detailed game description
- **Short Description**: Brief description for cards/previews
- **Featured Image**: Main game image
- **Category**: Game genre (Action, RPG, Strategy, etc.)
- **Release Date**: When the game was/will be released
- **Developer**: Game development company
- **Publisher**: Game publishing company
- **Age Rating**: Content rating (E, T, M, etc.)

#### Optional Fields

- **Gallery Images**: Additional images for the game
- **Platforms**: Available platforms (PC, PS5, Xbox, etc.)
- **Price**: Game price
- **Discount**: Discount percentage (0-100)
- **System Requirements**: Minimum and recommended specs
- **Game Features**: List of key features
- **Videos**: Gameplay videos and trailers
- **Screenshots**: In-game screenshots
- **Tags**: Searchable tags
- **SEO Title**: Custom title for search engines
- **SEO Description**: Custom description for search engines
- **Featured**: Whether to show in featured section
- **Published**: Whether the game is visible to users

### Editing an Existing Game

1. Click on the game in the Games list
2. Make your changes
3. Click "Save" to save as draft or "Publish" to make it live

### Game Categories

Available categories:

- Action
- Adventure
- RPG
- Strategy
- Simulation
- Sports
- Racing
- Puzzle
- Horror
- Fighting

### Platforms

Supported platforms:

- PC
- PlayStation 5
- PlayStation 4
- Xbox Series X/S
- Xbox One
- Nintendo Switch
- Mobile
- Web

## Review Management

### Creating a New Review

1. Click "Game Reviews" in the sidebar
2. Click "New Game Review"
3. Fill in the required fields:

#### Required Fields

- **Game**: Select the game being reviewed
- **Review Title**: Title of the review
- **Slug**: URL-friendly version
- **Reviewer Name**: Name of the reviewer
- **Rating**: Score from 1-10
- **Review Content**: Main review text (Markdown supported)
- **Published Date**: When the review was published

#### Optional Fields

- **Reviewer Avatar**: Profile picture of the reviewer
- **Pros**: List of positive aspects
- **Cons**: List of negative aspects
- **Featured**: Whether to feature this review

## File Structure

```
content/
├── games/
│   ├── sample-game.md
│   └── [other-game-files].md
└── reviews/
    ├── sample-review.md
    └── [other-review-files].md

public/
└── images/
    └── games/
        ├── [game-images].jpg
        └── [game-images].png
```

## Configuration

The CMS configuration is located in `src/app/(admin)/admin/cms/page.jsx`. Key configuration options:

### Backend Configuration

```javascript
backend: {
  name: 'git-gateway',
  branch: 'main',
}
```

### Media Configuration

```javascript
media_folder: 'public/images/games',
public_folder: '/images/games',
```

### Collections

The collections define the content structure and form fields for each content type.

## Troubleshooting

### Common Issues

1. **Images not displaying**
   - Check that images are uploaded to the correct folder
   - Verify the public_folder configuration
   - Ensure image paths are correct in content files

2. **Content not saving**
   - Check browser console for errors
   - Verify all required fields are filled
   - Ensure proper Markdown formatting

3. **CMS not loading**
   - Check that Decap CMS is properly installed
   - Verify the admin page is accessible
   - Check for JavaScript errors in browser console

### Debug Mode

To enable debug mode, add this to your CMS configuration:

```javascript
CMS.init({
  config: {
    // ... other config
    debug: true,
  },
});
```

## Best Practices

### Content Creation

1. **Use descriptive titles and slugs**
   - Titles should be clear and engaging
   - Slugs should be URL-friendly and descriptive

2. **Optimize images**
   - Use appropriate image sizes (recommended: 1200x675 for featured images)
   - Compress images before uploading
   - Use descriptive alt text

3. **Write engaging descriptions**
   - Short descriptions should be 1-2 sentences
   - Full descriptions should be detailed but readable
   - Use proper Markdown formatting

4. **Use tags effectively**
   - Add relevant tags for better discoverability
   - Keep tags consistent across similar content
   - Don't overuse tags

### SEO Optimization

1. **Fill in SEO fields**
   - Use custom SEO titles when needed
   - Write compelling SEO descriptions
   - Include relevant keywords

2. **Use proper headings**
   - Use H1 for main titles
   - Use H2, H3 for subsections
   - Maintain proper heading hierarchy

### Content Organization

1. **Keep content organized**
   - Use consistent naming conventions
   - Group related content together
   - Archive old content when appropriate

2. **Regular maintenance**
   - Review and update content regularly
   - Check for broken links
   - Update outdated information

## Advanced Features

### Custom Widgets

You can add custom widgets to the CMS for specialized content types. See the Decap CMS documentation for more information.

### Workflow

For teams, you can set up editorial workflows:

```javascript
collections: [
  {
    // ... collection config
    publish: false, // Require approval
    workflow: {
      mode: "simple",
    },
  },
];
```

### Preview Templates

You can create custom preview templates to see how content will look before publishing.

## Support

For additional help:

1. Check the [Decap CMS Documentation](https://decapcms.org/docs/)
2. Review the [GitHub Issues](https://github.com/decaporg/decap-cms/issues)
3. Join the [Decap CMS Community](https://decapcms.org/community/)

## Changelog

- **v1.0.0** - Initial CMS setup with games and reviews collections
- Added comprehensive game management features
- Added review system with ratings and pros/cons
- Configured media management for game images
- Added SEO optimization fields
- Implemented filtering and categorization system
