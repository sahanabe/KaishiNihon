# KaishiNihon

A comprehensive Japanese language learning platform built with React and Node.js.

## Features

- **JLPT Preparation**: Complete study materials for N1-N5 levels
- **Interactive Learning**: Vocabulary builders, memory games, and stroke puzzles
- **Language Assessment**: Comprehensive testing and progress tracking
- **AI Interview Preparation**: AI-powered interview practice sessions
- **Online Classes**: Virtual classroom functionality
- **Consultation Services**: Language consultation and visa application support
- **User Authentication**: Secure login and profile management

## Tech Stack

### Frontend
- React 19.1.0
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hook Form
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- RESTful API

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sahanabe/KaishiNihon.git
cd KaishiNihon
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Add necessary API keys and database connection strings

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
KaishiNihon/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── backend/                 # Node.js server
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   └── config/             # Configuration files
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- GitHub: [@sahanabe](https://github.com/sahanabe)
- Project Link: [https://github.com/sahanabe/KaishiNihon](https://github.com/sahanabe/KaishiNihon) 