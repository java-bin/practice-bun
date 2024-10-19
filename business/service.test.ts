import Database from "bun:sqlite";
import { TaskService } from "./service";
import { afterEach, beforeEach, expect } from "bun:test";
import { test } from "bun:test";

const db: Database = new Database("test.db");
db.exec(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT)`);
let service: TaskService;

beforeEach(() => {
    db.exec(`INSERT INTO tasks (title) VALUES ('EAT'), ('SLEEP'), ('ENJOY')`);
    service = new TaskService(db);
});

afterEach(() => {
    db.exec(`DELETE FROM tasks`);
});

test("findTasks", () => {
    const tasks = service.findTasks();
    expect(tasks).toHaveLength(3);
});

test("findTask", () => {
    const task = service.findTask(2);
    expect(task).toEqual({ 
        id: 2, 
        title: "SLEEP" 
    });
});

test("createTask", () => {
    const task = service.createTask({ title: "CODE" });

    expect(db.query(`SELECT * FROM tasks`).all()).toHaveLength(4);
    expect(db.query(`SELECT * FROM tasks WHERE id = 4`).get()).toEqual({
        id: 4,
        title: "CODE"
    });
});

test("updateTask", () => {
    expect(db.query(`SELECT * FROM tasks WHERE id = 2`).get()).toEqual({
        id: 2,
        title: "SLEEP"
    });
    service.updateTask(2, { title: "SLEEP MORE" });
    expect(db.query(`SELECT * FROM tasks WHERE id = 2`).get()).toEqual({
        id: 2,
        title: "SLEEP MORE"
    });
});

test("deleteTask", () => {
    service.deleteTask(3);
    expect(db.query(`SELECT * FROM tasks WHERE id = 3`).get()).toBeNull();
});