import { FlagKey, FlagOptions } from "@type/core";

export const flagCheck = (flags: FlagOptions, targetFlag: FlagKey): boolean => {
	return flags.filter((flag) => flag.key === targetFlag).length !== 0;
};
