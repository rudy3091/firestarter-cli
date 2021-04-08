import * as rl from "readline";
import { convert, Style } from "../color";

export const makeRaw = () => {
	rl.emitKeypressEvents(process.stdin);
	process.stdin.setRawMode(true);
};

export const readLine = (
	prompt: string,
	style?: Style,
	callback?: Function
): string => {
	const input = rl.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	const prmpt = style === undefined ? prompt : convert(prompt, style);
	input.question(prmpt, (line) => {
		input.close();
		callback(line);
	});
	return "";
};

export const print = (str: string, style?: Style) => {
	process.stdout.write(style === undefined ? str : convert(str, style));
};

export const println = (str: string, style?: Style) => {
	const finalStr =
		style === undefined ? str + "\r\n" : convert(str, style) + "\r\n";
	process.stdout.write(finalStr);
};

export const printFocused = (str: string, style?: Style) => {
	print("> " + str.trimStart(), style ?? undefined);
};

export const printlnFocused = (str: string, style?: Style) => {
	println("> " + str.trimStart(), style ?? undefined);
};

export const loadAltScreen = () => print("\x1B[?1049l");
export const unloadAltScreen = () => print("\x1B[?1049h");

export const hideCursor = () => print("\x1B[?25l");
export const showCursor = () => print("\x1B[?25h");

export const moveCursorUp = () => print("\u001b[A");
export const moveCursorDown = () => print("\u001b[B");

export const clearLine = () => print("\x1B[2K");
export const clearScreen = () => print("\x1B[2J\x1B[H");

export const hilightStyle = new Style("blue");
export const selectedStyle = new Style("cyan");
