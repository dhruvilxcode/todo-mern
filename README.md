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
        `/todo/{id of todo}/addtask` - Add Task
    </summary>

    Method: POST
    Body: 
        {
            title: "Task"
        }
</details>

---

### Blog
🟨 - in progress