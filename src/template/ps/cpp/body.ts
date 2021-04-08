import { FlagOptions } from "@type/core";
import { flagCheck } from "../..";
import { fastio } from "./components";

export const setupFuncExec = `setup()`;
export const solveFuncExec = `solve()`;

export const body = (flags: FlagOptions): string => {
	const hasNoFastIo = flagCheck(flags, "no fastio");
	const hasNoSetupFunc = flagCheck(flags, "no setup func");
	const hasNoSolveFunc = flagCheck(flags, "no solve func");
	const hasOnlyMainFunc = flagCheck(flags, "only main func");

	return `int main() {
  ${hasNoFastIo ? "" : fastio}

  ${
		hasOnlyMainFunc
			? ""
			: `${hasNoSetupFunc ? "" : setupFuncExec}
  ${hasNoSolveFunc ? "" : solveFuncExec}`
	}
  return 0;
}`;
};
