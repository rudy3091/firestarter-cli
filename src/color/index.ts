export type RGBColor = string;
export type AnsiColor = string;

export const ansiColorsFg = {
	black: () => ansiPrefix + "30m",
	red: () => ansiPrefix + "31m",
	green: () => ansiPrefix + "32m",
	yellow: () => ansiPrefix + "33m",
	blue: () => ansiPrefix + "34m",
	magenta: () => ansiPrefix + "35m",
	cyan: () => ansiPrefix + "36m",
	white: () => ansiPrefix + "37m",
};

export const ansiColorsBg = {
	black: () => ansiPrefix + "40m",
	red: () => ansiPrefix + "41m",
	green: () => ansiPrefix + "42m",
	yellow: () => ansiPrefix + "43m",
	blue: () => ansiPrefix + "44m",
	magenta: () => ansiPrefix + "45m",
	cyan: () => ansiPrefix + "46m",
	white: () => ansiPrefix + "47m",
};

export type Color = RGBColor | AnsiColor;

export const ansiPrefix = "\x1B[";
export const fgPrefix = ansiPrefix + "38;2;";
export const bgPrefix = ansiPrefix + "48;2;";
export const colorReset = ansiPrefix + "0m";

export const parseRGB = (hex: string): string[] => {
	const r = parseInt(hex.substr(1, 2), 16);
	const g = parseInt(hex.substr(3, 2), 16);
	const b = parseInt(hex.substr(5, 2), 16);
	return [r, g, b].map((n) => n.toString());
};

export const isAnsiColor = (param: unknown): param is AnsiColor => {
	return param !== null && Object.keys(ansiColorsFg).includes(param as string);
};

export const isColor = (param: unknown): param is Color => {
	if (param === null || param === undefined) return false;
	const isFormatted = (param as string).length === 7;
	const hasHash = (param as string)[0] === "#";

	const rgb = parseRGB(param as string);
	const isValid = rgb.filter((n) => n === "NaN").length === 0;

	return (isFormatted && hasHash && isValid) || isAnsiColor(param);
};

export const hexToAnsiFg = (param: Color): string => {
	if (isAnsiColor(param)) return ansiColorsFg[param]();
	const [r, g, b] = parseRGB(param);
	return fgPrefix + r + ";" + g + ";" + b + "m";
};

export const hexToAnsiBg = (param: Color): string => {
	if (isAnsiColor(param)) return ansiColorsBg[param]();
	const [r, g, b] = parseRGB(param);
	return bgPrefix + r + ";" + g + ";" + b + "m";
};

export class Style {
	public fgColor: Color;
	public bgColor: Color;

	constructor(fgColorHex?: string, bgColorHex?: string) {
		if (fgColorHex === undefined) {
			this.fgColor = null;
		} else {
			if (!isColor(fgColorHex)) throw new Error("Invalid Color format");
			this.fgColor = fgColorHex;
		}

		if (bgColorHex === undefined) {
			this.bgColor = null;
		} else {
			if (!isColor(bgColorHex)) throw new Error("Invalid Color format");
			this.bgColor = bgColorHex;
		}
	}

	fg(color: Color): Style {
		this.fgColor = color;
		return this;
	}

	bg(color: Color): Style {
		this.bgColor = color;
		return this;
	}
}

export const convert = (str: string, style: Style): string => {
	const fg = style.fgColor !== null ? hexToAnsiFg(style.fgColor) : "";
	const bg = style.bgColor !== null ? hexToAnsiBg(style.bgColor) : "";
	return fg + bg + str + colorReset;
};
