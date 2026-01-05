# Wagons Task Explorer

A React Native application built to explore, view, filter, and update
tasks fetched from a remote API with offline persistence.

This project demonstrates clean architecture, reusable UI components,
responsive design, and state management using React Context and Hooks.

------------------------------------------------------------------------

## 📱 Features

-   Fetch tasks from remote API (`jsonplaceholder.typicode.com`)
-   Offline-first support using AsyncStorage
-   Filter tasks by:
    -   All
    -   Completed
    -   Incomplete
-   View detailed task information
-   Update task completion status
-   Persistent state across app restarts
-   Responsive UI across different screen sizes
-   Centralized color and style management

------------------------------------------------------------------------

## 🛠 Tech Stack

-   **React Native**
-   **React Navigation (Native Stack)**
-   **Context API**
-   **Custom Hooks**
-   **AsyncStorage**
-   **Fetch API**

------------------------------------------------------------------------

## 📁 Project Structure

    src/
    │── api/
    │   └── tasksApi.js
    │
    │── assets/
    │   └── colors.js
    │   └── responsive.js
    │
    │── context/
    │   └── TasksContext.js
    │
    │── hooks/
    │   └── useTasks.js
    │
    │── navigation/
    │   └── AppNavigator.js
    │
    │── screens/
    │   ├── HomeScreen.js
    │   └── DetailScreen.js
    │
    └── App.js

------------------------------------------------------------------------

## 🔗 API Used

-   **Base URL:** `https://jsonplaceholder.typicode.com`
-   **Endpoint:** `/todos`

------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 1. Clone the repository

``` bash
git clone <repository-url>
cd wagons
```

### 2. Install dependencies

``` bash
npm install
# or
yarn install
```

### 3. Run the application

#### Android

``` bash
npx react-native run-android
```

#### iOS

``` bash
cd ios
pod install
cd ..
npx react-native run-ios
```

------------------------------------------------------------------------

## 🧠 Architectural Decisions

-   **Context API** is used for global task state management to avoid
    prop drilling.
-   **Custom Hooks** (`useTasksLogic`) encapsulate business logic for
    fetching, caching, and updating tasks.
-   **AsyncStorage** enables offline support and improves performance by
    reducing API calls.
-   **Responsive utilities** ensure consistent UI across different
    devices.
-   **Centralized colors** improve maintainability and enforce design
    consistency.

------------------------------------------------------------------------

## 🧪 Error Handling

-   Graceful error messages are displayed if the API fails.
-   Retry option is provided to re-fetch tasks.
-   Local storage fallback ensures usability even when offline.

------------------------------------------------------------------------

## 🚀 Future Improvements

-   Pull-to-refresh support
-   Pagination for large task lists
-   Dark mode enhancements
-   Unit and integration tests
-   API mutation sync with backend

------------------------------------------------------------------------

## 👨‍💻 Author

Developed as part of the Wagons assignment to demonstrate
production-ready React Native development practices.

------------------------------------------------------------------------

## 📄 License

This project is for evaluation and educational purposes.
