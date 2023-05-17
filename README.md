# ToDo List Web Application

The ToDo List web application is a simple tool that allows users to manage their tasks and create custom to-do lists. This project is built using Node.js, Express, and MongoDB. It provides a user-friendly interface for adding, viewing, and deleting tasks within both a general to-do list and custom lists.

## Features

**1. General To-Do List:** Users can manage tasks in a general to-do list. It allows adding, viewing, and deleting tasks that are not associated with any specific custom list.

**2. Custom Lists:** Users can create personalized lists with unique URLs. Each custom list functions independently, enabling users to add, view, and delete tasks specific to that list.

**3. Add Tasks:** Users can easily add new tasks to either the general list or a custom list. The user interface prevents adding empty tasks to maintain task clarity.

**4. View Tasks:** Tasks from both the general list and custom lists are displayed in an organized and accessible manner on the user interface.

**5. Delete Tasks:** Users have the option to delete tasks from both the general list and custom lists. This feature helps in keeping the lists up to date by removing completed or unnecessary tasks.

# !!
***This todo list has a limitation: it doesn't have user sign-up, sign-in, or log-out functionality. Currently, anyone can access the list and modify its content, offering no privacy or control. However, it does offer the ability to create a custom list with a unique URL path name known only to you, giving you a sort of private list option.

## Setup and Installation

To set up the ToDo List web application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/hybrid000/ToDoList.git`

2. Install dependencies: `cd todo-list` and then run `npm install`

3. Configure the MongoDB connection: In the code, update the MongoDB connection URL (`"mongodb://127.0.0.1:27017/ToDoList"`) to match your local MongoDB server.

4. Start the server: Run `npm start` to start the server on port 3000.

5. Access the application: Open your web browser and navigate to `http://localhost:3000` to use the ToDo List application.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- EJS (Embedded JavaScript) - for rendering views


## Contributing

Contributions to the ToDo List web application are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue in the repository.



