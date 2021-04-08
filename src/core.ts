import fs from "fs";
import path from "path";
import cpp from "./template/ps/cpp";
import { execChild, MessageFlux, MessageMono } from "./spawner";
import { print, println } from "./console";
import { opOptions } from "./op";
import { flagOptions } from "./flags";
import { Style } from "./color";

export const toAbsolutePath = (p: string): string => {
	return path.resolve(p);
};

export type Operation = "  ps" | "  default (ps)";
export type ProjectName = string;
export type Flag = string;
export type Context = "op" | "projname" | "flags";

export type GenSource = {
	op: Operation;
	projname: ProjectName;
	flags: Flag[];
};

export const mkdir = (loc: string, dir: string): void => {
	fs.mkdir(path.join(loc, dir), {}, (err) => {
		if (err) {
			print(" ERROR ", new Style("black", "red"));
			println(` Directory named ${dir} already exists`);
			process.exit(1);
		}
	});
};

export const touch = (loc: string, file: string): void => {
	fs.writeFile(path.join(loc, file), cpp, (err) => {
		if (err) console.log(err);
	});
};

export async function fetchInput(): Promise<GenSource> {
	const data: GenSource = {
		op: null,
		projname: null,
		flags: [],
	};

	const msg1 = await execChild("dist/op/process.js");
	data.op = opOptions[(msg1 as MessageMono).selected];

	const msg2 = await execChild("dist/projname/process.js");
	data.projname = (msg2 as MessageMono).input;

	const msg3 = await execChild("dist/flags/process.js");
	(msg3 as MessageFlux).selected.forEach((v, i) => {
		if (v) data.flags.push(flagOptions[i].key);
	});

	return data;
}

export const run = async () => {
	const input = await fetchInput();
	const rootDir = path.join(__dirname, "..");
	mkdir(rootDir, input.projname);
	touch(path.join(rootDir, input.projname), "main.cpp");
};
