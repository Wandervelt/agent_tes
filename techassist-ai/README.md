# TechAssist AI - Field Service AI Assistant

An AI-powered assistant for field service technicians that provides pre-visit preparation and on-site troubleshooting support.

## Features

- **Pre-Visit Mode**: Get equipment information, common issues, and required tools
- **On-Site Mode**: Real-time troubleshooting with image analysis
- **Natural Language Chat**: Conversational interface for easy interaction
- **Computer Vision**: Analyze equipment photos to identify issues
- **Interactive Guidance**: Step-by-step troubleshooting assistance

## Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env` and add your OpenAI API key
3. Run with Docker Compose:

```bash
docker-compose up
```

4. Access the application at http://localhost:3000

## Development Setup

### Frontend (React + TypeScript)
```bash
cd frontend
npm install
npm start
```

### Backend (FastAPI + Python)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Socket.io
- **Backend**: FastAPI, LangGraph, OpenAI API, Redis
- **Computer Vision**: OpenCV, Pillow
- **Infrastructure**: Docker, Docker Compose

## Demo Scenarios

1. **Pre-Visit Preparation**: Ask about "Carrier 24ACB3 not cooling"
2. **Equipment Identification**: Upload equipment photos for analysis
3. **Troubleshooting**: Describe symptoms for diagnostic guidance