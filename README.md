# MovieBox API

A complete Node.js Express API server that provides full access to MovieBox content through RESTful endpoints. Successfully converted from the original Python moviebox-api library with all endpoints functional and real download links working.

## Features

- **Real Movie & TV Search** - Search the complete MovieBox database with live results
- **Detailed Information** -  Get comprehensive movie/series metadata including cast, ratings, descriptions
- **Working Download Links** - Access real download sources in multiple qualities (360p - 1080p)
- **Trending Content** - Live trending movies and TV series data
- **Homepage Content** - Featured movies and recommendations
- **Download Proxy** - Bypass CDN restrictions with automatic header injection
- **Mobile Authentication** - Uses mobile app headers for authentic data access
- **Region Bypass** - Circumvents geo-blocking restrictions

## API Endpoints

All endpoints return JSON responses with real MovieBox data.

### Search Movies & TV Series
```
GET /api/search/:query
```
Search for any movie or TV series in the MovieBox database.

**Example:**
- `/api/search/avatar` - Search for Avatar movies
- `/api/search/spider-man` - Search for Spider-Man content
- `/api/search/wednesday` - Search for Wednesday TV series

### Movie Information
```
GET /api/info/:movieId
```
Get detailed information about a specific movie or TV series.

**Example:**
- `/api/info/8906247916759695608` - Avatar movie details
- `/api/info/3815343854912427320` - Spider-Man: Across the Spider-Verse details

### Download Sources
```
GET /api/sources/:movieId
```
Get real download links with multiple quality options. Returns both direct URLs and proxy URLs that work in browsers.

**Response includes:**
- Multiple video qualities (360p, 480p, 720p, 1080p)
- File sizes and formats
- Direct download URLs
- Proxy URLs for browser compatibility

**Example:**
- `/api/sources/8906247916759695608` - Avatar download sources

### Homepage Content
```
GET /api/homepage
```
Get the latest homepage content including featured movies and recommendations.

### Trending Content
```
GET /api/trending
```
Get currently trending movies and TV series with real-time data.

### Download Proxy
```
GET /api/download/[encoded-video-url]
```
Proxy endpoint that adds proper headers to bypass CDN restrictions for direct downloads. Video URLs are automatically provided in the sources endpoint response.

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## Dependencies

- **Express.js** - Web framework
- **Axios** - HTTP client with cookie jar support
- **Cheerio** - HTML parsing (for future features)
- **tough-cookie** - Cookie management
- **axios-cookiejar-support** - Session handling

## Technical Implementation

### Authentication
- Uses mobile app headers (`okhttp/4.12.0`) for authentic access
- Session cookie management for API authentication
- Automatic session initialization and maintenance

### Region Bypass
- IP spoofing headers to circumvent geo-blocking
- Multiple fallback mechanisms for different regions
- Supports global access to content

### Download Proxy
- Automatic header injection for CDN access
- Stream-based proxying for large video files
- Bypasses browser restrictions with proper referer headers

### API Compatibility
- Maintains compatibility with original Python moviebox-api
- Real MovieBox data from `h5.aoneroom.com` and related domains
- Access to CDN resources at `valiw.hakunaymatata.com`

## Usage Examples

### Search for Movies
```javascript
// Search for Avatar movies
fetch('/api/search/avatar')
  .then(response => response.json())
  .then(data => console.log(data.data.items));
```

### Get Movie Details
```javascript
// Get Avatar movie information
fetch('/api/info/8906247916759695608')
  .then(response => response.json())
  .then(data => console.log(data.data.subject));
```

### Get Download Sources
```javascript
// Get Avatar download links
fetch('/api/sources/8906247916759695608')
  .then(response => response.json())
  .then(data => {
    // Access both direct and proxy URLs
    data.data.processedSources.forEach(source => {
      console.log(`${source.quality}: ${source.proxyUrl}`);
    });
  });
```

## Response Format

All endpoints return responses in the following format:

```json
{
  "status": "success",
  "data": {
    // Endpoint-specific data
  }
}
```

Error responses:
```json
{
  "status": "error",
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Development

The API is built as a single-file Express application (`index.js`) for simplicity and ease of deployment. All routes, middleware, and helper functions are contained within this file.

### Key Components

- **Session Management** - Automatic cookie handling for API authentication
- **Request Wrapper** - Centralized API request handling with proper headers
- **Error Handling** - Comprehensive error responses and logging
- **CORS Support** - Cross-origin requests enabled for web applications

## Deployment

The API is ready for deployment on any Node.js hosting platform:

1. Ensure all dependencies are installed
2. Set `PORT` environment variable if needed (defaults to 5000)
3. Start with `npm start` or `node index.js`

### Environment Variables

- `PORT` - Server port (default: 5000)
- `MOVIEBOX_API_HOST` - Override default API host if needed

## Project History

This project successfully converts the original Python moviebox-api library to JavaScript/Express while maintaining full functionality and adding new features:

- **Original**: Python-based CLI and library
- **Converted**: Full Express.js web API
- **Enhanced**: Added proxy endpoints, mobile headers, region bypass
- **Completed**: All endpoints operational with real data and working downloads

## Status

**All 6 endpoints fully operational** with authentic MovieBox data and working download links.

- ✅ Search functionality with real results
- ✅ Movie information with complete metadata  
- ✅ Download sources with working links in multiple qualities
- ✅ Homepage and trending content with live data
- ✅ Proxy downloads that bypass browser restrictions
- ✅ Mobile authentication and region bypass working

## License

This project is for educational and research purposes. Please respect MovieBox's terms of service and applicable copyright laws.
