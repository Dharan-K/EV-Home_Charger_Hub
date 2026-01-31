# HomeChargerShare

A comprehensive web platform for sharing and renting home EV chargers, built to connect EV owners with available charging infrastructure.

## 🚀 Features

- **Interactive Maps**: View charger locations with real-time data from OpenCharger API
- **Charger Listings**: Browse and rent home chargers from verified hosts
- **User Authentication**: Secure login/signup with Firebase
- **Billing Integration**: Seamless payment processing for rentals
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Real-time Availability**: Check charger status and book instantly

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend Services**: Firebase (Authentication, Firestore)
- **Maps & API**: OpenCharger API, Leaflet Maps
- **State Management**: React Context
- **Routing**: React Router
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dharan-K/EV-Home_Charger_Hub.git
   cd EV-Home_Charger_Hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   VITE_OPENCHARGER_API_KEY=your_opencharger_api_key
   VITE_OPENCHARGER_API_BASE=https://api.openchargemap.io/v3
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📖 Usage

- **Browse Chargers**: View available home chargers on the interactive map
- **Rent a Charger**: Select a charger and complete booking with integrated billing
- **List Your Charger**: Register as a host and add your home charger to the platform
- **Manage Bookings**: Track your rentals and earnings

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── contexts/           # React contexts for state management
├── lib/                # Utility functions and API clients
├── hooks/              # Custom React hooks
├── data/               # Static data and mock data
└── services/           # External API services
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Dharan-K**
- Email: dharankandasamy2007@gmail.com
- GitHub: [@Dharan-K](https://github.com/Dharan-K)

## 🙏 Acknowledgments

- OpenCharger API for providing charger location data
- Firebase for backend services
- shadcn/ui for beautiful UI components
