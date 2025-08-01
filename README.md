# War Child Trauma Platform

A web-based dashboard platform where volunteer psychologists can access child trauma assessment reports and provide professional recommendations.

## Features

- View and manage trauma assessment reports
- Review detailed child assessments with multi-modal data
- Provide professional recommendations
- Track report status and progress
- Communicate with mobile apps

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 9.0.0 or later

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd war_child_trauma_platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   └── page.tsx       # Main dashboard page
├── components/        # React components
│   └── dashboard/    # Dashboard-specific components
├── data/             # Mock data (temporary)
└── types/            # TypeScript type definitions
```

## Development

The project uses:
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn UI for components
- React Query for data management

## API Routes

- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create a new report
- `GET /api/reports/:id` - Get a specific report
- `PUT /api/reports/:id` - Update a report

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
