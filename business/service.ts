import Database from "bun:sqlite";

type Task = {
    id : number;
    title : string;
}

export class TaskService {
    constructor(private readonly db: Database) {}

    findTasks() {
        const selectMany = this.db.query("SELECT * FROM tasks");
        return selectMany.all();
    }

    findTask(id: number) {
        const selectOne = this.db.query("SELECT * FROM tasks WHERE id = :id"); // ?
        return selectOne.get(id);
    }

    createTask(task: Omit<Task, "id">) {
        const insert = this.db.query("INSERT INTO tasks (title) VALUES (:title)"); // (?)
        return insert.run(task.title);
    }

    updateTask(id: number, task: Omit<Task, "id">) {
        const update = this.db.prepare("UPDATE tasks SET title = :title WHERE id = :id"); // ?
        return update.run(task.title, id);
    }

    deleteTask(id: number) {
        const remove = this.db.prepare("DELETE FROM tasks WHERE id = :id"); // ?
        return remove.run(id);
    }
}