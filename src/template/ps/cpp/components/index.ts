export * from "./includes";
export * from "./controls";

export const appendNewline = (str: string, indent?: number): string => {
	return (
		str +
		`
${String("  ").repeat(indent ?? 0)}`
	);
};
