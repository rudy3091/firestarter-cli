export type Operation = "ps (cpp)";
export type ProjectName = string;
export type Flag = string;
export type Context = "op" | "projname" | "flags";

export type FlagKey = string;
export type FlagValue = string | number;

export type FlagOptions = {
	key: FlagKey;
	needsValue: boolean;
	value?: FlagValue;
}[];
