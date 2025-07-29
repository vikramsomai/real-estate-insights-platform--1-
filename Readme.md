
## 🌐 Frontend (Next.js)

### 🧩 Prerequisites

- Node.js (v18+)
- npm or pnpm

### 🔧 Install & Run Locally

```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Run in dev mode
npm run dev

# Build for production
npm run build


NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api


cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate

# Install dependencies
pip install -r simple_requirements.txt

# Run Flask app
python simple_app.py


FLASK_ENV=development
JWT_SECRET_KEY=your-secret-key
