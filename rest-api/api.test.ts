import { spyOn, test, expect } from "bun:test"
import { app } from "./api"
import { TaskService } from "../business/service"
import Undici from "undici-types";

test("Get /tasks", async () => {
    const findTasks = spyOn(TaskService.prototype, "findTasks");
    findTasks.mockReturnValue(
        [{ id: 1, title: "EAT" },
        { id: 2, title: "SLEEP" }]
    );
    const response = await app.handle(new Request("http://localhost/tasks"));
    expect(response.status).toBe(200);

    const tasks = await response.json();
    expect(tasks).toHaveLength(2);
    expect(findTasks).toHaveBeenCalledTimes(1);
    expect(findTasks).toHaveBeenCalledWith();
});

test("GET /tasks/:id", async () => {
    const findTask = spyOn(TaskService.prototype, "findTask");
    findTask.mockReturnValue({ 
        id: 3, title: "ENJOY" 
    });
    const response = await app.handle(new Request("http://localhost/tasks/3"));

    expect(response.status).toBe(200);
    const task = await response.json();
    expect(task).toEqual({ id: 3, title: "ENJOY" });
    expect(findTask).toHaveBeenCalledTimes(1);
    expect(findTask).toHaveBeenCalledWith(3);
});

test("POST /tasks", async () => {
    const createTask = spyOn(TaskService.prototype, "createTask");
    createTask.mockImplementation(() => {});
    const response = await app.handle(
        new Request("http://localhost/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ title: "CODE" }),
        })
    );
    expect(response.status).toBe(201);
    await expect(response.text()).resolves.toBe("Task created");
    expect(createTask).toHaveBeenCalledTimes(1);
    expect(createTask).toHaveBeenCalledWith({ title: "CODE" });
});

test("PUT /tasks/:id", async () => {
    const updateTask = spyOn(TaskService.prototype, "updateTask");
    updateTask.mockImplementation(() => {});
    const response = await app.handle(
        new Request("http://localhost/tasks/3", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ title: "DANCE" }),
        })
    );
    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe("Task updated");
    expect(updateTask).toHaveBeenCalledTimes(1);
    expect(updateTask).toHaveBeenCalledWith(3, { title: "DANCE" });
});

test("DELETE /tasks/:id", async () => {
    const deleteTask = spyOn(TaskService.prototype, "deleteTask");    
    deleteTask.mockImplementation(() => {});
    const response = await app.handle(
        new Request("http://localhost/tasks/1", {
            method: "DELETE",
        })
    );
    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe("Task deleted");
    expect(deleteTask).toHaveBeenCalledTimes(1);
    expect(deleteTask).toHaveBeenCalledWith(1);
});