# Trimrr – URL Shortener with Analytics

**Live:** [https://url-shortener-trimrr.vercel.app](https://url-shortener-trimrr.vercel.app)

Trimrr is a full-stack web application that allows users to shorten long URLs, generate QR codes, and view click analytics (location and device info). Users can log in, manage links, and monitor performance through a clean dashboard.

## Tech Stack

- **Frontend:** React, Tailwind CSS, ShadCN UI, React Router
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Row-Level Security)
- **Others:** QR Code generation (`react-qrcode-logo`), Lucide Icons, Vercel (deployment)

## Key Features

- User authentication and protected routes
- Custom and auto-generated short URLs
- QR code generation stored on Supabase
- Link-level analytics: click count, location, device
- Secure redirect handling

## Deployment

Hosted on **Vercel**  
Supabase used for Auth, DB, Storage, and RLS policies

---

