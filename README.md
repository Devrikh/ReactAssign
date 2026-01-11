# React Artwork DataTable

## Overview
This project is a React application built using **Vite** and **TypeScript** that displays artwork data from the **Art Institute of Chicago API**.  
It demonstrates **server-side pagination**, **persistent row selection**, and a **custom overlay panel for selecting multiple rows**, implemented using **PrimeReact DataTable**.

The implementation strictly follows the internship assignment requirements, especially around **avoiding data prefetching** and **maintaining selection state across pages**.

---

## Features

### Data Table
- Displays artwork information with the following fields:
  - `title`
  - `place_of_origin`
  - `artist_display`
  - `inscriptions`
  - `date_start`
  - `date_end`
- Built using **PrimeReact DataTable**.
- Uses **lazy loading** with server-side pagination.
- Only the **current page data** is stored in memory.

---

### Server-Side Pagination
- Pagination controls are enabled using PrimeReact.
- Data is fetched from the API whenever the page changes.
- No bulk or advance data fetching is performed.
- API requests are always page-based:
  - `https://api.artic.edu/api/v1/artworks?page=<page>`

---

### Row Selection
- Checkbox-based row selection.
- Supports:
  - Selecting/deselecting individual rows.
  - Selecting/deselecting all rows on the **current page**.
- Selection state is preserved when navigating between pages.

---

### Custom Overlay Selection Panel
- An **OverlayPanel** allows the user to input a number (`n`) to select rows.
- Behavior:
  - Rows are first selected from the **current page**.
  - If `n` exceeds available rows on the page, the **remaining selection is deferred**.
  - Remaining selection is applied **only when the user navigates to the next visited page**.
- No additional API calls or prefetching is triggered by this logic.

---

### Persistent Selection Strategy
- Selection is tracked using a `Set<number>` containing **row IDs only**.
- No row objects or data from other pages are stored.
- Previously selected rows remain selected when revisiting a page.
- This strategy ensures:
  - No memory bloat
  - No violation of assignment constraints
  - Predictable selection behavior

---

## Technical Details

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **UI Library:** PrimeReact
- **API:** Art Institute of Chicago API
- **State Management:** React hooks (`useState`, `useEffect`, `useRef`)
- **Selection Storage:** `Set<number>` (row IDs only)

---

## How to Run Locally

1. **Clone the repository**
```bash
git clone <repo-url>
cd <repo-folder>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. Open the application in your browser at:
```
http://localhost:5173
```

---

## Assignment Compliance Checklist

- ✅ Vite + TypeScript used  
- ✅ PrimeReact DataTable implemented  
- ✅ Server-side pagination (no bulk fetch)  
- ✅ Persistent row selection across pages  
- ✅ Custom overlay panel for selecting `n` rows  
- ✅ No prefetching or storing data from other pages  
- ✅ Selection tracked using row IDs only  

**Important Note:**  
When a custom selection exceeds the rows available on the current page, the remaining selection is intentionally applied when the user navigates to the next page. This design avoids prefetching and fully complies with assignment constraints.

---

## Live URLs
- **GitHub Repository:** `https://github.com/Devrikh/ReactAssign`
- **Deployed App:** `https://growmeorganicreactassigndevrikh.netlify.app/`

