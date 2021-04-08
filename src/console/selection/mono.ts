import * as _console from "..";
import { MessageMono } from "../../spawner";
import { Style } from "../../color";
import { Context } from "../../core";

export const openSelection = (options: string[]) => {
	options.forEach((option, i) => {
		if (i === 0) _console.printlnFocused(option, _console.hilightStyle);
		else _console.println(option, new Style());
	});
};

export const singleSelect = (options: string[], context: Context) => {
	_console.makeRaw();
	_console.hideCursor();

	let idx = 0;
	const len = options.length;

	const printSelected = () => {
		_console.println(options[idx] + "\r");
	};

	const handleKeyPress = (str: string, key: any) => {
		// on SIGINT
		if (key.sequence === "\u0003") {
			_console.showCursor();
			process.exit(1);
		}

		// up
		if (str === "j" || key.sequence === "\u001b[B") {
			if (idx < len - 1) {
				_console.clearLine();
				_console.print(options[idx] + "\r");
				_console.moveCursorDown();
				idx++;
				_console.printFocused(options[idx] + "\r", _console.hilightStyle);
			}
		}

		// down
		else if (str === "k" || key.sequence === "\u001b[A") {
			if (idx > 0) {
				_console.clearLine();
				_console.print(options[idx] + "\r");
				_console.moveCursorUp();
				idx--;
				_console.printFocused(options[idx] + "\r", _console.hilightStyle);
			}
		}

		// enter
		else if (key.sequence === "\r") {
			for (let i = idx; i < len; i++) {
				_console.moveCursorDown();
			}
			for (let i = 0; i < len; i++) {
				_console.clearLine();
				_console.moveCursorUp();
			}
			_console.clearLine();
			printSelected();
			_console.showCursor();

			const msg: MessageMono = {
				context: context,
				type: "mono",
				selected: idx,
			};
			process.send(msg);
			process.exit(0);
		}
	};

	openSelection(options);
	for (let i = 0; i < options.length; i++) _console.moveCursorUp();
	process.stdin.on("keypress", handleKeyPress);
};
