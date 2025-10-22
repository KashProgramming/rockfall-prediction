# AI-Based Rockfall Prediction and Alert System
> An intelligent early warning system that prevents mining fatalities through AI-powered rockfall prediction

## Overview
This is a comprehensive AI pipeline designed to predict and prevent rockfall disasters in open-pit mines. Unlike generic models, our system creates **mine-specific prediction pipelines** that adapt to local geological conditions, rainfall patterns, and terrain characteristics.

### Key Features

- **6-48 Hour Early Warnings** - Automated anomaly detection with LSTM models
- **Explainable AI** - SHAP-powered interpretability showing risk factors
- **Mine-Specific Adaptation** - Custom pipeline for each mining site
- **Multi-Source Data Integration** - DEMs, sensors, weather, and drone imagery
- **Dual Alert System** - Dashboard for administrators, SMS/WhatsApp for miners
- **Cost-Effective Monitoring** - Open-source tools and free datasets

## What Makes Our Product Unique

### 1. Pipeline Over Generic Model
Instead of a one-size-fits-all solution, we deploy modular, retrainable pipelines tailored to:
- Mine-specific Digital Elevation Models (DEMs)
- Local geotechnical parameters
- Regional rainfall patterns
- Site-specific geological conditions

### 2. Synthetic Data Augmentation
- **Fractal Terrain Modeling** - Generate realistic geological variations
- **TimeGAN Integration** - Create synthetic time series data
- **Event Injection** - Balance rare rockfall events in training data

### 3. Explainable Risk Assessment
```
Example Output: "Rainfall anomaly + pore pressure spike on steep slope → Hazard Index 0.82 (High Risk)"
```

## Architecture

### Tech Stack
```
Frontend:  Next.js + TailwindCSS + Mapbox GL + Recharts
Backend:   FastAPI + PostgreSQL + PostGIS + Redis
ML/AI:     PyTorch + TensorFlow + TimeGAN + SHAP + Optuna
Cloud:     AWS EC2 + S3
DevOps:    Docker + Kubernetes + Prefect + MLflow
```

### Data Processing Pipeline
<img width="329" height="423" alt="system_flow" src="https://github.com/user-attachments/assets/b4395fc9-e9e9-4c75-aa64-244da69d6aa5" />


### LSTM Dual Branch Model
- **Dynamic Branch**: LSTM autoencoder for temporal anomaly detection
- **Static Branch**: DEM-based susceptibility analysis
- **Fusion**: `Hazard Index = Anomaly Score × DEM Susceptibility`

## Data Sources

| Data Type | Source | Purpose |
|-----------|---------|---------|
| DEMs | ISRO Bhoonidhi, Cartosat | Terrain analysis & slope monitoring |
| Weather | NASA POWER API | Rainfall & temperature tracking |
| Sensors | BGS Geotechnical API | Pore pressure, displacement, strain |
| Imagery | OpenDroneMap, COLMAP | Real-time terrain changes |

## Usage

### For Mine Administrators
1. **Dashboard Access** - Real-time risk heatmaps and analytics
2. **Alert Configuration** - Set up custom thresholds and notification rules
3. **Historical Analysis** - Review past incidents and model performance
4. **Explainable AI Reports** - Understand risk factors through SHAP analysis

### For Mine Workers
1. **Simple Registration** - Select mine site and register phone number
2. **Automatic Alerts** - Receive SMS/WhatsApp warnings
3. **Risk Level Updates** - Real-time safety status notifications


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
