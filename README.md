# StatSphere 🚀

A premium data analytics platform with a dual-engine architecture (**Next.js** + **FastAPI**) and **MongoDB** persistence.

## 🌟 Key Features
- **Smart Upload**: Drag-and-drop CSV/XLSX parsing.
- **Dual-Domain Dashboards**: Tailored analysis for **Medical** and **Engineering** industries.
- **Python-Powered Analytics**: Real-time statistical processing using **Pandas** and **NumPy**.
- **Discovery Engine**: AI-generated insights with dynamic dashboard population.

## 🛠️ Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, shadcn/ui.
- **Backend**: Node.js, MongoDB (Mongoose).
- **Analysis**: Python (FastAPI), Pandas.

## 🚀 Getting Started

### 1. Web App
```bash
bun install
bun dev
```

### 2. Analysis Service
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r analysis/requirements.txt
cd analysis
python3 main.py
```

*Ensure your `.env` is configured with a valid `MONGODB_URI`.*
