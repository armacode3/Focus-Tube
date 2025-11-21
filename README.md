# Focus Tube

A distraction-free YouTube client built with **Next.js 15** and **Tailwind CSS**. This application leverages the YouTube Data API to allow users to search for videos, view playlists, and watch content in a clean, focused interface without the clutter of the standard YouTube algorithm.

## Features

* **Video Search**: Search for videos using the YouTube Data API.
* **Video Player**: Dedicated video playback pages (`/video/[videoId]`).
* **Playlist Support**: Browse and view full playlists (`/playlist/[playlistId]`).
* **Search Suggestions**: Real-time search suggestions.
* **Modern UI**: Responsive and clean interface built with Tailwind CSS v4.
* **Secure API Handling**: Uses Next.js API Routes to proxy requests to YouTube, keeping your API key secure on the server side.

## Project Structure

* `src/app/api/`: Backend routes that act as a proxy for the YouTube API.
    * `search/`: Proxy for video search queries.
    * `video/`: Proxy for retrieving video details.
    * `playlist/`: Proxy for retrieving playlist details.
    * `suggestions/`: Proxy for search suggestions.
* `src/app/`: Frontend pages using Next.js App Router.
    * `page.js`: The main landing page with the search bar.
    * `search/[id]`: Displays search results.
    * `video/[id]`: Displays the video player.

## Prerequisites

Before running the project, ensure you have the following:

1.  **Node.js** installed.
2.  A **Google Cloud Project** with the **YouTube Data API v3** enabled.
3.  An **API Key** from the Google Cloud Console.

## Setup & Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/focus-tube.git](https://github.com/yourusername/focus-tube.git)
cd focus-tube
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your YouTube API key.
```
API_KEY=your_youtube_data_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:3000` with your browser.

## Tech Stack
* **Framework**: Next.js
* **Styling**: Tailwind CSS
* **API**: YouTube Data API v3

