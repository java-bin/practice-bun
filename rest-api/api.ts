import { Elysia, t } from "elysia";
import { taskDatabase } from "../business/database";
import { TaskService } from "../business/service";


const service = new TaskService(taskDatabase);
export const app = new Elysia()
    .get("/tasks", () => service.findTasks())
    .get("/tasks/:id", ({ params: { id } }) => {
        const task = service.findTask(+id);
        if (task) {
            return task;
        }
        return new Response("Task not found", { status: 404 });
    })
    .post("/tasks", ({ body: task }) => { 
        service.createTask(task);
        return new Response("Task created", { status: 201 });
    },
    { body : t.Object({ title: t.String() }) 
    })
    .put("/tasks/:id", ({ params: {id}, body: task }) => {
        service.updateTask(+id, task);
        return new Response("Task updated", { status: 200 });
    },
    { body: t.Object({ title: t.String() }) 
    })
    .delete("/tasks/:id", ({ params: { id } }) => {
        service.deleteTask(+id);
        return new Response("Task deleted", { status: 200 });
    });
