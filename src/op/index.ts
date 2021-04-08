import { Style } from "../color";
import { print, println } from "../console";
import { singleSelect } from "../console/selection/mono";
import { Operation } from "../core";

export const opOptions: Operation[] = ["  default (ps)", "  ps"];

export const promptOperation = () => {
	print(" Q ", new Style("black", "blue"));
	println(" what are you going to do?", new Style("blue"));
	singleSelect(opOptions, "op");
};
