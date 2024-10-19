console.log("Hello via Bun!");

Bun.serve({
    fetch() {
        return new Response("Hello, Bun!");
    }
})

// alert("Hello via Bun!");

// const answer = confirm("Are you happy?");
// if (answer) console.log("😁");
// else console.log("😭");

// const name = prompt("What is your name?");
// console.log(`Hello, ${name}!`);

alert(">> 구구단 프로그램.");
while (true) {
    const input = prompt("몇 단을 출력할까요?");
    if (!input?.trim()) {
        console.log("값을 입력하세요.")
    } else if (!["2", "3", "4", "5", "6", "7", "8", "9"].includes(input)) {
        console.log("2에서 9 사이의 값만 입력하세요.")
    } else {
        for (let i = 1; i <= 9; i++) {
            console.log(`${parseInt(input)} * ${i} = ${parseInt(input) * i}`);
        }
    }
    const done = confirm(">> 종료 하시겠습니까?");
    if (done) break;
}