import * as _console from "..";
import { MessageFlux } from "@type/message";
import { Style } from "../../color";
import { Context } from "@type/core";

export const openSelection = (options: string[]) => {
	options.forEach((option, i) => {
		if (i === 0) _console.printlnFocused(option, _console.hilightStyle);
		else _console.println(option, new Style());
	});
};

export const multiSelect = (options: string[], context: Context) => {
	_console.makeRaw();
	_console.hideCursor();

	let idx = 0;
	let selectedItemCount = 0;
	const len = options.length;
	const selected: boolean[] = Array.from(new Array<boolean>(len), () => false);

	const printSelected = () => {
		for (let i = 0; i < len; i++) {
			if (selected[i]) _console.println(options[i] + "\r");
		}
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
				if (selected[idx])
					_console.print(options[idx] + "\r", _console.selectedStyle);
				else _console.print(options[idx] + "\r");
				_console.moveCursorDown();
				idx++;
				_console.printFocused(options[idx] + "\r", _console.hilightStyle);
			}
		}

		// down
		else if (str === "k" || key.sequence === "\u001b[A") {
			if (idx > 0) {
				_console.clearLine();
				if (selected[idx])
					_console.print(options[idx] + "\r", _console.selectedStyle);
				else _console.print(options[idx] + "\r");
				_console.moveCursorUp();
				idx--;
				_console.printFocused(options[idx] + "\r", _console.hilightStyle);
			}
		}

		// select
		else if (str === "l" || key.sequence === "\u001b[C") {
			selected[idx] = true;
			selectedItemCount++;
		}

		// unselect
		else if (str === "h" || key.sequence === "\u001b[D") {
			selected[idx] = false;
			selectedItemCount--;
		}

		// enter
		else if (key.sequence === "\r") {
			if (selectedItemCount === 0) selected[idx] = true;
			for (let i = idx; i < len; i++) {
				_console.moveCursorDown();
			}
			for (let i = 0; i < len; i++) {
				_console.clearLine();
				_console.moveCursorUp();
			}
			_console.clearLine();
			// println(options[idx]);
			printSelected();
			_console.showCursor();

			const msg: MessageFlux = {
				context: context,
				type: "flux",
				selected: selected,
			};
			process.send(msg);
			process.exit(0);
		}
	};

	openSelection(options);
	for (let i = 0; i < options.length; i++) _console.moveCursorUp();
	process.stdin.on("keypress", handleKeyPress);
};
