# React Artwork DataTable

## Overview
This project is a React application built using **Vite** and **TypeScript** that displays artwork data from the Art Institute of Chicago API. It demonstrates **server-side pagination**, **persistent row selection**, and a **custom overlay panel for selecting multiple rows**.

The application is implemented with **PrimeReact DataTable** and follows all requirements for the internship assignment.

## Features

### Data Table
- Displays artwork information with the following fields:
  - `title`
  - `place_of_origin`
  - `artist_display`
  - `inscriptions`
  - `date_start`
  - `date_end`
- Lazy loading with **server-side pagination**.
- Fetches only the current page data from the API.

### Pagination
- Implements server-side pagination using the API.
- Fetches new data whenever the user navigates to a different page.
- Shows total number of records and current page range.

### Row Selection
- Checkboxes for selecting/deselecting rows individually.
- Supports selecting/deselecting all rows on the current page.
- Custom overlay panel allows selecting **n number of rows** via an input.
- Pending selection for rows exceeding current page is applied on the **next visited page**.
- Selections persist across page navigation.

### Persistent Selection
- Tracks selection by storing **row IDs only**, not full objects.
- Selected rows on page 1 remain selected when navigating to page 2 and returning.
- Remaining rows from overlay selection are applied when a new page is fetched.

### Overlay Panel for Custom Selection
- Input a number of rows to select (e.g., 20).
- Automatically selects rows on the current page.
- Remaining selection is stored and applied on the next visited page.
- Prevents prefetching other pages, avoiding memory issues.

## Technical Details

- **Frontend Framework:** React + TypeScript + Vite
- **UI Components:** PrimeReact (`DataTable`, `Column`, `OverlayPanel`, `Button`, `InputNumber`)
- **API:** Art Institute of Chicago API (`https://api.artic.edu/api/v1/artworks`)
- **State Management:** React `useState`, `useEffect`, and `useRef`
- **Persistent Selection:** Tracked via a `Set<number>` storing selected row IDs.

## How to Run

1. **Clone the repository:**
```bash
git clone <repo-url>
cd <repo-folder>
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. Open the application in your browser at `http://localhost:5173` (or the URL shown in terminal).

## Submission Compliance

This project fully complies with the internship assignment requirements:
- ✅ Uses Vite + TypeScript.
- ✅ Implements PrimeReact DataTable.
- ✅ Fetches only current page data (server-side pagination).
- ✅ Persistent selection across pages.
- ✅ Custom overlay panel for selecting `n` rows.
- ✅ No prefetching of other pages or storing unnecessary data.
- ✅ Tracks selection by row IDs only.

**Note:** Remaining overlay selection is applied only when the user navigates to the next page, as required.

## Deployment
- Can be deployed on **Netlify**, **Cloudflare Pages**, or any static hosting provider.
- **Vercel is not recommended** due to restricted access in submissions.

## URL


