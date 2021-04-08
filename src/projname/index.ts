import { MessageMono } from "../spawner";
import { Style } from "../color";
import { print, println } from "../console";
import { getTextInput } from "../console/input/text";

export const promptProjectName = () => {
	print(" Q ", new Style("black", "blue"));
	println(" what is your project name?", new Style("blue"));

	getTextInput((input: string) => {
		const msg: MessageMono = {
			context: "projname",
			type: "mono",
			input: input,
		};
		process.send(msg);
	});
};
