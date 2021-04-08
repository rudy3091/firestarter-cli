import * as console from "..";
import { Style } from "../../color";

export const getTextInput = (callback: Function) => {
	console.readLine("> ", new Style("blue"), callback);
};
