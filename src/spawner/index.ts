import { fork } from "child_process";
import { Style } from "../color";
import { println } from "../console";
import { Context } from "../core";

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
