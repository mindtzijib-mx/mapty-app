# Mapty - React Workout Tracker 🏃‍♂️🚴‍♀️

A modern React-based workout tracking application that allows users to log their running and cycling workouts on an interactive map. This project is a migration from vanilla JavaScript to React with TypeScript.

## 🌟 Features

- **Interactive Map**: Click anywhere on the map to add a new workout
- **Workout Types**: Support for both running and cycling workouts with different metrics
- **Geolocation**: Automatically centers the map on your current location
- **Data Persistence**: All workouts are saved to localStorage and persist between sessions
- **Workout Navigation**: Click on any workout in the sidebar to navigate to its location on the map
- **Form Validation**: Ensures all inputs are valid positive numbers
- **Responsive Design**: Clean, modern UI that works on different screen sizes

## 🚀 Tech Stack

- **React 19** - Modern React with functional components and hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Leaflet** - Interactive maps library
- **CSS3** - Custom styling with CSS variables and Grid layout
- **HTML5 Geolocation API** - For getting user's current position

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mapty-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Use

1. **Allow Location Access**: When prompted, allow the app to access your location
2. **Add a Workout**: Click anywhere on the map where you want to log a workout
3. **Fill the Form**:
   - Select workout type (Running or Cycling)
   - Enter distance in kilometers
   - Enter duration in minutes
   - For running: Enter cadence (steps per minute)
   - For cycling: Enter elevation gain in meters
4. **Submit**: Press Enter or click OK to save the workout
5. **View Workouts**: All workouts appear in the sidebar with calculated metrics
6. **Navigate**: Click any workout in the sidebar to pan the map to that location

## 📊 Workout Metrics

### Running Workouts

- **Distance**: Kilometers covered
- **Duration**: Time spent running
- **Pace**: Automatically calculated (min/km)
- **Cadence**: Steps per minute

### Cycling Workouts

- **Distance**: Kilometers covered
- **Duration**: Time spent cycling
- **Speed**: Automatically calculated (km/h)
- **Elevation Gain**: Meters climbed

## 🏗️ Project Structure

```
src/
├── components/
│   ├── WorkoutForm.tsx      # Form component for adding workouts
│   └── WorkoutList.tsx      # Component for displaying workout list
├── hooks/
│   └── useGeolocation.ts    # Custom hook for geolocation (ready for future use)
├── types/
│   └── workout.ts           # TypeScript types and workout classes
├── App.tsx                  # Main application component
├── App.css                  # Application styles
├── index.css                # Global styles and fonts
└── main.tsx                 # Application entry point
```

## 🧪 Testing

This project includes comprehensive tests using **Jest** and **React Testing Library**:

### Test Coverage

- **25 test cases** covering all major functionality
- **95.34% statement coverage**
- **86.36% branch coverage**
- **100% function coverage**

### What's Tested

- **Workout Classes**: Running and Cycling workout creation and calculations
- **WorkoutForm Component**: Form validation, input handling, and submission
- **WorkoutList Component**: Workout rendering and user interactions
- **useGeolocation Hook**: Geolocation API integration and error handling

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages.

### Live Demo

🌐 **[View Live Demo](https://mindtzijib-mx.github.io/mapty-app/)**

### Automatic Deployment

The app automatically deploys to GitHub Pages when you push to the `main` branch using GitHub Actions:

1. **Tests Run**: All tests must pass before deployment
2. **Linting**: Code is checked for style issues
3. **Build**: Production build is created
4. **Deploy**: Automatically deployed to GitHub Pages

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run deploy` - Deploy to GitHub Pages manually

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme with orange and green accents
- **Custom Icons**: Emoji-based icons for different workout types and metrics
- **Smooth Animations**: CSS transitions for form interactions
- **Map Integration**: Custom popup styling that matches the app theme
- **Grid Layout**: Responsive grid system for workout details

## 🔄 Migration from Vanilla JS

This project was migrated from a vanilla JavaScript implementation to React with the following improvements:

- **Component Architecture**: Modular, reusable React components
- **Type Safety**: Full TypeScript integration with proper typing
- **Modern React Patterns**: Functional components with hooks
- **Better State Management**: React state management instead of DOM manipulation
- **Improved Developer Experience**: Hot reload, better debugging, and IDE support

## 📱 Browser Support

- Modern browsers with ES6+ support
- Geolocation API support required
- Local Storage support required

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Original concept by Jonas Schmedtmann. Use for learning or your portfolio. Don't use to teach. Don't claim as your own.

## 🙏 Acknowledgments

- Original Mapty project concept by [Jonas Schmedtmann](https://twitter.com/jonasschmedtman)
- [Leaflet](https://leafletjs.com/) for the amazing mapping library
- [OpenStreetMap](https://www.openstreetmap.org/) for the map tiles
- [React](https://react.dev/) team for the excellent framework

---

**Happy Tracking! 🏃‍♂️🚴‍♀️**
