# CinemaVerse Deployment Guide

## Netlify Deployment

This Wasp application is configured for deployment on Netlify.

### Build Process

1. **Wasp CLI Installation**: The build script automatically installs Wasp CLI if not present
2. **Dependencies**: Installs Node.js dependencies via `npm install`
3. **Wasp Build**: Runs `wasp build` to generate the client-side application
4. **Output**: The built application is available in `.wasp/out/client`

### Netlify Configuration

The `netlify.toml` file contains:
- Build command: `./build.sh`
- Publish directory: `.wasp/out/client`
- Node.js version: 18
- SPA redirect rules for client-side routing

### Environment Variables

Make sure to set these environment variables in your Netlify dashboard:

- `DATABASE_URL`: Your production database connection string
- `TMDB_API_KEY`: The Movie Database API key
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `GROQ_API_KEY`: Groq API key for AI features
- Any other API keys used in your application

### Database Setup

1. Set up a production database (PostgreSQL recommended)
2. Run migrations: `wasp db migrate-dev`
3. Set the `DATABASE_URL` environment variable

### Build Script

The `build.sh` script handles:
- Wasp CLI installation
- Dependency installation
- Wasp application building
- Error handling and logging

### Troubleshooting

If the build fails:
1. Check that all environment variables are set
2. Verify the database connection
3. Check the build logs for specific error messages
4. Ensure the Wasp CLI installation completed successfully
