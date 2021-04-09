import { FlagOptions } from "@type/core";
import { flagCheck } from "../..";
import { main, usingStd, vector } from "./components";

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

	let headerString = `${waterMark}

`;
	headerString += `${main}
`;
	headerString += `${
		hasNoGlobalUsingStd
			? ""
			: `${usingStd}

`
	}`;
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
