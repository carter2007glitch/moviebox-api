# Project Overview

## Overview

This is a complete Node.js Express API server that provides full access to MovieBox content through RESTful endpoints. Successfully converted from the original Python moviebox-api library, this API now offers comprehensive functionality to search for movies and TV series, get trending content, retrieve detailed information, and fetch real streaming download sources with working direct links.

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

**API Endpoints (ALL WORKING)**
- `GET /` - Health check and API documentation
- `GET /api/homepage` - Real homepage content from MovieBox
- `GET /api/trending` - Live trending movies and TV series
- `GET /api/search/:query` - Search for movies and TV series with real results
- `GET /api/info/:movieId` - Detailed movie/series information with metadata
- `GET /api/sources/:movieId` - **WORKING DOWNLOAD LINKS** - Real streaming sources with direct URLs

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

**2025-01-20**: Successfully completed full Python moviebox-api to JavaScript conversion
- ✓ All 6 API endpoints fully functional with real MovieBox data
- ✓ Sources endpoint breakthrough: Region bypass headers implemented successfully
- ✓ Real download links working for Avatar, Spider-Man, and other movies
- ✓ Enhanced mobile headers using PCAP analysis findings (okhttp/4.12.0 user agent)
- ✓ Authentication system with session cookies working perfectly
- ✓ CDN access to valiw.hakunaymatata.com for direct movie downloads
- ✓ Mobile-friendly HTML documentation with example links created
- ✓ Comprehensive README.md documentation completed
- ✅ PROJECT COMPLETE: Full API with docs ready for deployment