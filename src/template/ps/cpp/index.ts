import { header, setupFunc, solveFunc } from "./header";
import { body } from "./body";
import { TemplateGenerator } from "@type/template";
import { FlagOptions } from "@type/core";

const cpp: TemplateGenerator = (flags: FlagOptions) => `${header(flags)}
${body(flags)}
`;

export default cpp;
