import { FlagOptions } from "@type/core";
import { flagCheck } from "../..";
import { fastio } from "./components";

export const setupFuncExec = `setup();`;
export const solveFuncExec = `solve();`;

export const body = (flags: FlagOptions): string => {
	const hasNoGlobalUsingStd = flagCheck(flags, "no global using namespace std");
	const hasNoFastIo = flagCheck(flags, "no fastio");
	const hasNoSetupFunc = flagCheck(flags, "no setup func");
	const hasNoSolveFunc = flagCheck(flags, "no solve func");
	const hasOnlyMainFunc = flagCheck(flags, "only main func");

	let bodyString = `int main() {
	`;
	bodyString += hasNoFastIo
		? ""
		: `${fastio(hasNoGlobalUsingStd)}

  `;

	if (hasOnlyMainFunc) {
		bodyString += `return 0;
}`;
	} else {
		bodyString += hasNoSetupFunc
			? ""
			: `${setupFuncExec}
  `;
		bodyString += hasNoSolveFunc
			? ""
			: `${solveFuncExec}

  `;
		bodyString += `return 0;
}`;
	}

	return bodyString;
};
