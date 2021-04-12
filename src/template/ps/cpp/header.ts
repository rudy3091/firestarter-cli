import { FlagOptions } from "@type/core";
import { flagCheck } from "../..";
import {
	main,
	usingStd,
	coord,
	edge,
	edgeLong,
	appendNewline,
} from "./components";

export const waterMark: string = `/*
 * Auto generated with firestarter-cli by @rudy3091
 * https://github.com/rudy3091/firestarter-cli
 */`;

export const setupFunc: string = `void setup() {
}`;

export const solveFunc: string = `void solve() {
}`;

export const header = (flags: FlagOptions) => {
	const hasNoSetupFunc = flagCheck(flags, "no setup func");
	const hasNoSolveFunc = flagCheck(flags, "no solve func");
	const hasNoGlobalUsingStd = flagCheck(flags, "no global using namespace std");
	const hasOnlyMainFunc = flagCheck(flags, "only main func");

	const hasTypedefCoord = flagCheck(flags, "typedef coord");
	const hasTypedefEdge = flagCheck(flags, "typedef edge");
	const hasTypedefEdgeLong = flagCheck(flags, "typedef edge longlong");

	let headerString = `${waterMark}

${main}
`;

	if (!hasNoGlobalUsingStd) {
		headerString += usingStd;
		headerString = appendNewline(headerString);
	}

	if (hasTypedefCoord) {
		headerString += coord(hasNoGlobalUsingStd);
		headerString = appendNewline(headerString);
	}
	if (hasTypedefEdge) {
		headerString += edge(hasNoGlobalUsingStd);
		headerString = appendNewline(headerString);
	}
	if (hasTypedefEdgeLong) {
		headerString += edgeLong(hasNoGlobalUsingStd);
		headerString = appendNewline(headerString);
	}
	headerString = appendNewline(headerString);

	if (hasOnlyMainFunc) {
		return headerString;
	} else {
		headerString += `${
			hasNoSetupFunc
				? ""
				: `${setupFunc}

`
		}`;
		headerString += `${
			hasNoSolveFunc
				? ""
				: `${solveFunc}

`
		}`;
	}

	return headerString;
};
