# FlowZen

FlowZen is a comprehensive and intuitive task management application designed to help users effectively organize, prioritize, and manage their daily tasks. Built with a modern technology stack, FlowZen provides a seamless and productive experience for individuals seeking to enhance their productivity.

## Features:

FlowZen offers a range of features to streamline your task management workflow:

- **Task Input:** Easily add new tasks with detailed descriptions, allowing you to capture all necessary information.
- **Task Completion:** Mark tasks as complete with a simple click, providing a clear visual indication of your progress.
- **Due Dates:** Set specific due dates for your tasks to prioritize your workload and avoid missing deadlines.
- **List Organization:** Create and customize multiple lists or categories to group related tasks, bringing structure and order to your task list.
- **AI Suggestion:** Leverage the power of AI to generate intelligent suggestions for list names, categories, or even subtasks, sparking inspiration and aiding in organization.

## Technology Stack:

FlowZen is built using the following technologies:

- **Frontend:** Developed with NextJS and React, providing a fast and responsive user interface. Shadcn/ui is used for a collection of beautifully designed and accessible UI components.
- **Backend:** Utilizes Firebase for robust data storage and synchronization. Firebase services like Firestore are used to manage task data efficiently.
- **AI:** Integrates with Genkit AI to provide intelligent features like AI-powered suggestions.

## Project Structure:

The project is organized into the following directories:

- `/src/app`: Contains the main application pages, routing, and layout components.
- `/src/components`: Houses reusable React components used throughout the application.
- `/src/lib`: Includes utility functions, helper classes, and type definitions.
- `/src/hooks`: Contains custom React hooks for managing component logic.
- `/src/ai`: Configures and defines the Genkit AI flows and interactions.
- `/docs`: Stores project documentation, including blueprints and other relevant information.

## Getting Started:

To get FlowZen up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/awtawsif/FlowZen.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install all the necessary project dependencies.
3.  **Set up Firebase:**
    - Go to the Firebase console and create a new Firebase project.
    - In your Firebase project settings, add a web application and copy your Firebase configuration.
    - Create a `.env.local` file in the root of your project and add your Firebase configuration as environment variables (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY=...`).
    - (Optional) Set up Firebase services like Firestore and Authentication as required by the application.
4.  **Set up Genkit AI:**
    - Refer to the Genkit AI documentation for detailed instructions on setting up the AI services and models.
    - Configure the necessary environment variables in your `.env.local` file for Genkit AI authentication and API keys.
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the development server using Turbopack on port 9002. Open your browser and navigate to `http://localhost:9002` to access the application.

## Available Scripts:

- `npm run dev`: Starts the development server with Turbopack on port 9002.
- `npm run genkit:dev`: Starts the Genkit AI development server for testing and development of AI flows.
- `npm run genkit:watch`: Starts the Genkit AI development server with file watching, automatically restarting the server when changes are detected.
- `npm run build`: Builds the NextJS application for production deployment.
- `npm run start`: Starts the production server to serve the built application.
- `npm run lint`: Runs ESLint to analyze the code for potential errors and enforce code style.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors in the codebase.

## Styling:

FlowZen features a clean and minimalist design based on the following style guidelines:

- **Primary color:** Light teal (#A0CED9) - Used for primary interactive elements and branding.
- **Background color:** Light gray (#F0F0F0) - Provides a clean and neutral backdrop for the application content.
- **Accent color:** Soft blue (#B2BEB5) - Used for accentuating key elements and providing visual highlights.
- **Font:** 'Inter' sans-serif - A modern and highly readable font used for all text elements.
- Simple, minimalist icons: Icons are designed to be clear and easily recognizable.
- Clean and straightforward layout: The layout is designed for optimal usability and focus on task management.
- Subtle animations for task transitions: Smooth and subtle animations enhance the user experience during task interactions.

## Contributing:

We welcome contributions from the community! If you'd like to contribute to FlowZen, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed instructions on how to get started, code style guidelines, and the contribution process.

## License:

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for more details.
