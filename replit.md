# Project Overview

## Overview

This is a Node.js Express API server that provides access to MovieBox content through RESTful endpoints. The application serves as a JavaScript conversion of the original Python moviebox-api library, offering functionality to search for movies and TV series, get trending content, retrieve detailed information, and fetch streaming sources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

**Runtime Environment**
- Node.js 20.x with Express.js framework
- RESTful API architecture serving JSON responses
- Cookie-based session management for MovieBox API authentication
- CORS-enabled for cross-origin requests

**Application Structure**
- Entry point: `index.js` containing the complete Express server
- Single-file architecture with all routes and middleware
- Asynchronous request handling with proper error management
- Session cookies managed via tough-cookie and axios-cookiejar-support

**API Endpoints**
- `GET /` - Health check and API documentation
- `GET /api/homepage` - Homepage content from MovieBox
- `GET /api/trending` - Trending movies and TV series
- `GET /api/search/:query` - Search for movies and TV series
- `GET /api/info/:movieId` - Detailed movie/series information
- `GET /api/sources/:movieId` - Streaming sources and download links

**Design Principles**
- Converted from Python moviebox-api to JavaScript/Express
- Maintains API compatibility with original library functionality
- Proper authentication flow with MovieBox backend services
- Error handling with detailed status responses

## External Dependencies

**Runtime Dependencies**
- Node.js 20.x runtime environment
- Express.js 4.19.2 web framework
- Axios for HTTP requests with cookie jar support
- Cheerio for potential HTML parsing
- tough-cookie and axios-cookiejar-support for session management

**Third-party Services**
- MovieBox API backend (multiple mirror hosts supported)
- Configured to use moviebox.pk as primary host

**Development Tools**
- npm package manager for dependency management
- Replit workflows for server management

**Database/Storage**
- No local database - all data fetched from MovieBox API
- Session cookies stored in memory for API authentication

## Recent Changes

**2025-01-20**: Successfully converted Python moviebox-api to JavaScript Express server
- ✓ Implemented all major API endpoints (homepage, trending, search, info)
- ✓ Added proper cookie-based authentication system
- ✓ Configured multiple mirror hosts for redundancy
- ✓ Working endpoints return real MovieBox data
- → Sources endpoint experiencing 403 errors (likely due to enhanced API security)