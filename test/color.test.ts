import { convert, isAnsiColor, isColor, Style } from "../src/color";

describe("Color", () => {
	test("checks Color type well", () => {
		expect(isColor("#ff0000")).toBe(true);
		expect(isColor("#8a38e3")).toBe(true);
		expect(isColor("#ffffff")).toBe(true);
		expect(isColor("#000000")).toBe(true);

		expect(isColor("#ff0")).toBe(false);
		expect(isColor("#ff00")).toBe(false);
		expect(isColor("##f0000")).toBe(false);
		expect(isColor("##134987")).toBe(false);
		expect(isColor("#l00000")).toBe(false);
		expect(isColor("#00kl00")).toBe(false);
	});
});

describe("AnsiColor", () => {
	test("checks AnsiColor types well", () => {
		expect(isAnsiColor("red")).toBe(true);
		expect(isAnsiColor("cyan")).toBe(true);
		expect(isAnsiColor("yellow")).toBe(true);

		expect(isAnsiColor("marvelousRed")).toBe(false);
		expect(isAnsiColor("coral")).toBe(false);
		expect(isAnsiColor("peru")).toBe(false);
	});
});

describe("Style class' constructor", () => {
	test("works well", () => {
		expect(new Style("#ff0000", "#000000")).toBeTruthy();
	});

	test("also works well with ansi colors", () => {
		expect(new Style("red", "black")).toBeTruthy();
		expect(new Style("blue", "cyan")).toBeTruthy();
		expect(new Style("white", "red")).toBeTruthy();
	});

	test("also works well when mixed", () => {
		expect(new Style("red", "#000000")).toBeTruthy();
		expect(new Style("#f8391b", "blue")).toBeTruthy();
		expect(new Style("#000000", "magenta")).toBeTruthy();
	});

	test("fails with invalid color format", () => {
		expect(() => new Style("##ffffff")).toThrowError();
		expect(() => new Style("#ffff")).toThrowError();
		expect(() => new Style("#147891", "213971")).toThrowError();
	});
});

describe("Style class' chaining", () => {
	test("works well with both method", () => {
		expect(new Style().fg("#00ffd0").bg("#1f5180")).toBeTruthy();
	});

	test("works well with only one method", () => {
		expect(new Style().fg("#ff0000")).toBeTruthy();
		expect(new Style().bg("#343298")).toBeTruthy();
	});

	test("works well with ansi colors", () => {
		expect(new Style().fg("red").bg("blue")).toBeTruthy();
		expect(new Style().fg("black").bg("white")).toBeTruthy();
		expect(new Style().fg("yellow").bg("green")).toBeTruthy();
	});
});

describe("Style class'", () => {
	test("fgColor property is not null if fgcolor is given", () => {
		expect(new Style("#a72420").fgColor).not.toBeNull();
	});

	test("both property is not null if both color is given", () => {
		const color: Style = new Style("#319478", "#408571");
		expect(color.fgColor).not.toBeNull();
		expect(color.bgColor).not.toBeNull();
	});
});

describe("convert function", () => {
	test("success with valid color", () => {
		expect(convert("test string", new Style("#ffffff"))).toBeTruthy();
		expect(convert("test string", new Style("#000000"))).toBeTruthy();
		expect(
			convert("test string", new Style("#000000", "#143279"))
		).toBeTruthy();
	});

	test("fails with invalid color", () => {
		expect(() => convert("test string", new Style("##ffffff"))).toThrowError();
	});
});
