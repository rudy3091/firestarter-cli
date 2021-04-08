import { Style } from "../../color";
import { print, println } from "../../console";
import { multiSelect } from "../../console/selection/flux";

export const psFlagOptions: { key: string }[] = [
	{ key: "  default" },
	{ key: "  no setup func" },
	{ key: "  no solve func" },
	{ key: "  only main func" },
	{ key: "  no fastio" },
	{ key: "  typedef coord" },
	{ key: "  typedef edge" },
	{ key: "  typedef edge longlong" },
	{ key: "  --dfs" },
	{ key: "  --bfs" },
];

export const promptFlags = () => {
	print(" Q ", new Style("black", "blue"));
	println(" what do you need?", new Style("blue"));
	multiSelect(
		psFlagOptions.map((option) => option.key),
		"flags"
	);
};
