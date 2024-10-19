import Database from "bun:sqlite";

export const taskDatabase = new Database("test.db");
taskDatabase.exec("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, title TEXT);");