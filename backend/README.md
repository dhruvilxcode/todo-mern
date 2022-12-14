# NodeJS TODO Backend App

# Steps:

### 1. Create .env file

Create `.env` file at root of your project and paste your MongoDB URL.

```javscript
MONGODB_URL="paste your URL here"
```

### Routes

<details>
    <summary>
        `/todo` - Get All Todos
    </summary>

    Method: GET
</details>

<details>
    <summary>
        `/todo/add` - Create Todo
    </summary>

    Method: POST
    Body:
        {
            title: "Todo Title"
        }
</details>

<details>
    <summary>
        `/todo/{id of todo}/update` - Update Todo
    </summary>

    Method: PUT
    Body:
        {
            title: "Updated Todo Title"
        }
</details>

<details>
    <summary>
        `/todo/{id of todo}/delete` - Delete Todo
    </summary>

    Method: DELETE
</details>

<details>
    <summary>
        `/todo/{id of todo}/tasks/add` - Add Task
    </summary>

    Method: POST
    Body: 
        {
            title: "Task"
        }
</details>

<details>
    <summary>
        `/todo/{id of todo}/tasks/get` - Get All Tasks
    </summary>

    Method: GET
</details>

<details>
    <summary>
        `/todo/{id of todo}/tasks/delete` - Delete Task
    </summary>

    Method: DELETE
    Body: 
        {
            title: "Task"
        }
</details>

<details>
    <summary>
        `/todo/{id of todo}/tasks/update` - Update Task
    </summary>

    Method: PUT
    Body: 
        {
            title: "Existing task title",
            newTitle: "New title name to update"
        }
</details>

---

### Blog
🟨 - in progress