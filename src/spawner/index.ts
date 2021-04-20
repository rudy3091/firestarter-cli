import { fork, spawn } from "child_process";
import { Style } from "../color";
import { clearLine, println } from "../console";
import { Message, MessageFlux, MessageMono } from "@type/message";

export const isMessageFlux = (param: unknown): param is MessageFlux => {
	return (param as Message).type === "flux";
};

export const isMessageMono = (param: unknown): param is MessageMono => {
	return (param as Message).type === "mono";
};

export const execNodeCommand = (
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
			} else {
				clearLine();
				println("😭 Aborted!", new Style("green"));
			}
		});
	});
};

export const execChild = (cmd: string, args: string[]) => {
	return new Promise<string>((resolve, reject) => {
		const child = spawn(cmd, args, { stdio: "inherit" });

		child.on("exit", (code: number) => {
			if (code !== 0) {
				clearLine();
				println("Error!", new Style("black", "red"));
			} else {
				resolve("ok");
			}
		})
	});
}
