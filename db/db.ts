import { Database } from "bun:sqlite";

// db가 생성됨
const db = new Database("file.db");

// in memory db가 생성됨 중요!
// const memoryDb = new Database(":memory:");

// create table
db.exec(`
    CREATE TABLE IF NOT EXISTS contries (
        id INTEGER PRIMARY KEY,
        name TEXT,
        code TEXT)
`);

// db.exec(`CREATE INDEX inx_code ON contries(code)`);

const countries = [
    { $code: "KR", $name: "Korea" },
    { $code: "US", $name: "United States" },
    { $code: "JP", $name: "Japan" },
    { $code: "CN", $name: "China" },
];

const insert = db.prepare(`INSERT INTO contries (code, name) VALUES ($code, $name)`);
for (const country of countries) {
    insert.run(country);
}

// update
const update = db.prepare(`UPDATE contries SET name = $name WHERE code = $code`);
update.run({ $code: "KR", $name: "대한민국" });

// delete
const remove = db.prepare(`DELETE FROM contries WHERE code = $code`);
remove.run({ $code: "CN" });

// select
const selectOne = db.query(`SELECT * FROM contries WHERE code = $code`);
const oneCountry = selectOne.get({ $code: "KR" });
console.log(oneCountry);

// select all
const selectAll = db.query(`SELECT * FROM contries`);
const allCountries = selectAll.all();
console.log(allCountries);

db.close();