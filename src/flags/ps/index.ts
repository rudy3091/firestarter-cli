import { Style } from "../../color";
import { print, println } from "../../console";
import { multiSelect } from "../../console/selection/flux";
import { psFlagOptions } from "../../core"

export const promptFlags = () => {
	print(" Q ", new Style("black", "blue"));
	println(" what do you need?", new Style("blue"));
	multiSelect(
		psFlagOptions.map((option) => option.key),
		"flags"
	);
};
