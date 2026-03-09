# Nice Gadgets Store

Nice Gadgets Store is a full-stack web application for browsing and managing a modern gadget catalog (phones, tablets, accessories) with a clean e-commerce style UI and API-backed data.

## Live Preview

- Frontend: https://yaroslav65.github.io/Nice-Gadgets-Store

## Design Reference

- [Rounded Style v2 (Light)](https://www.figma.com/design/FRxncC4lfyhs6og1L6FGEU/Phone-catalog--V2--Rounded-Style-2)
- [Original Dark v2](https://www.figma.com/design/BUusqCIMAWALqfBahnyIiH/Phone-catalog--V2--Original-Dark)

## Recent Updates

| Icon | Update | Details |
|------|--------|---------|
| 📇 | Footer `Contacts` popup | Location, phone, email |
| 🛡️ | Footer `Rights` modal | React Portal + dark transparent backdrop |
| ⚡ | Search optimization | Debounced input (`250ms`) in `SearchBar` |
| 🚀 | Route performance | Page-level lazy loading (`React.lazy + Suspense`) |
| 🧩 | Cart optimization | Lazy-loaded checkout modal |

## Tech Stack

| Layer | Icon | Stack |
|------|------|-------|
| Frontend | 🎨 | React 18, TypeScript, React Router, SCSS Modules, Vite |
| Backend | 🧠 | Node.js, Express, Prisma ORM, PostgreSQL |
| Tooling | 🛠️ | ESLint, Prettier, Stylelint |

## Main Features

| Icon | Feature | Description |
|------|---------|-------------|
| 📱 | Category browsing | Phones, tablets, accessories |
| 📚 | Product catalog | Listing, sorting, filtering, pagination |
| 🔎 | Product details | Dedicated details page for each item |
| ❤️ | Favorites | Persistent favorites in local storage |
| 🛒 | Cart | Persistent cart with quantity management |
| 🌗 | Theme switch | Dark/Light mode |
| 🔍 | Search | Search with dropdown suggestions |
| 📌 | Footer UX | Contacts popup + rights modal |

### SearchBar

| Icon | Capability | Description |
|------|------------|-------------|
| ⌨️ | Live suggestions | Product hints while typing |
| ❌ | Quick clear | One-click clear button |
| 🧭 | Fast navigation | Direct jump to product details |
| 🔗 | URL-aware behavior | Works with current route/query |
| ⏱️ | Debounce | Optimized input handling (`250ms`) |

## Project Structure

```text
Nice-Gadgets-Store/
  frontend/   # React app (UI)
  backend/    # Express + Prisma API
```

## Run Locally

### 1. Clone

```bash
git clone https://github.com/Yaroslav65/Nice-Gadgets-Store.git
cd Nice-Gadgets-Store
```

### 2. Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
cd ..
```

### 3. Configure backend environment

Create `backend/.env` and set:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nice_gadgets?schema=public&sslmode=disable"
PORT=5055
```

### 4. Prepare database

```bash
npm run prisma:generate
npm run prisma:migrate
npm --prefix backend run prisma:seed
```

### 5. Run app (frontend + backend)

```bash
npm run dev
```

Frontend and backend will run in parallel using root scripts.

## API Endpoints (Core)

- `GET /api/health`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/products/:itemId`

## Contact

Built by Yaroslav Halynskyi

- LinkedIn: https://www.linkedin.com/in/yaroslav-halynskyi-2270442a8
- GitHub: https://github.com/Yaroslav65
