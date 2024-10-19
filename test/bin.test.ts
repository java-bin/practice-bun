import { describe, it, test, expect } from "bun:test";

test("1 is 1", () => {
    expect(1).toBe(1);
});

describe("Example Test Suite", () => {
    it("1 + 2 === 3", () => {
        expect(1 + 2).toBe(3);
    });

    // todo test
    it.todo("not running", () => {
        expect(1 + 2).toBe(4);
    });

    // only test
    // bun test only --only
    it.only("only running", () => {
        expect(1 + 2).toBe(3);
    });
});

// skip test
test.skip("skip test", () => {
    expect(1 + 2).toBe(3);
});
