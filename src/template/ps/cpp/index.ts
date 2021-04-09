import { header, setupFunc, solveFunc } from "./header";
import { body } from "./body";
import { TemplateGenerator } from "@type/template";
import { FlagOptions } from "@type/core";

const cpp: TemplateGenerator = (flags: FlagOptions) => {
	return `${header(flags)}${body(flags)}
`;
};

export default cpp;
