import { fork } from "child_process";
import { resolve } from "node:path";
import { Style } from "../color";
import { println } from "../console";
import { Context, GenSource, Operation } from "../core";
import { flagOptions } from "../flags";
import { opOptions } from "../op";

export interface Message {
	context: Context;
	type: "flux" | "mono";
}

export interface MessageFlux extends Message {
	selected: boolean[];
}

export interface MessageMono extends Message {
	selected?: number;
	input?: string;
}

export const isMessageFlux = (param: unknown): param is MessageFlux => {
	return (param as Message).type === "flux";
};

export const isMessageMono = (param: unknown): param is MessageMono => {
	return (param as Message).type === "mono";
};

// export const execChild = async (target: string, callback?: Function) => {
// 	const child = fork(target, { stdio: "inherit" });
// 	child.on("message", (m: MessageFlux | MessageMono) => {
// 		// if (m.context === "op" && isMessageMono(m)) {
// 		// 	data.op = opOptions[m.selected] as Operation;
// 		// } else if (m.context === "projname" && isMessageMono(m)) {
// 		// 	data.projname = m.input;
// 		// } else if (m.context === "flags" && isMessageFlux(m)) {
// 		// 	m.selected.forEach((tr, i) => {
// 		// 		if (tr) data.flags.push(flagOptions[i].key);
// 		// 	});
// 		// }

// 		println(JSON.stringify(m));

// 		// if (m.context === "op" && isMessageMono(m)) {
// 		// data.op = opOptions[m.selected];
// 		// println(JSON.stringify(m));
// 		// }
// 		// return m.selected;
// 	});

// 	if (callback === undefined) {
// 		child.on("exit", (code: number) => {
// 			if (code !== 1) {
// 				println("\n👌 Happy Hacking!", new Style("green"));
// 			} else println("\n😭 Aborted!", new Style("green"));
// 		});
// 	} else {
// 		child.on("exit", (code: number) => {
// 			if (code !== 1) callback();
// 			else println("\n😭 Aborted!", new Style("green"));
// 		});
// 	}
// };

export const execChild = (
	target: string
): Promise<MessageMono | MessageFlux> => {
	return new Promise<Message>((resolve, reject) => {
		const child = fork(target, { stdio: "inherit" });
		let m: MessageMono | MessageFlux;

		child.on("message", (msg: MessageFlux | MessageMono) => {
			m = msg;
		});

		child.on("exit", (code: number) => {
			if (code !== 1) {
				resolve(m);
			} else println("\n😭 Aborted!", new Style("green"));
		});
	});
};
