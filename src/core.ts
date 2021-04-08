import fs from "fs";
import path from "path";
import cpp from "./template/ps/cpp";
import { MessageFlux, MessageMono } from "@type/message";
import { execChild } from "./spawner";
import { print, println } from "./console";
import { Style } from "./color";
import { Operation, ProjectName, Flag } from "@type/core";

export const toAbsolutePath = (p: string): string => {
	return path.resolve(p);
};

export const opOptions: Operation[] = ["ps (cpp)"];
export const psFlagOptions: { key: string }[] = [
	{ key: "default" },
	{ key: "no setup func" },
	{ key: "no solve func" },
	{ key: "only main func" },
	{ key: "no fastio" },
	{ key: "typedef coord" },
	{ key: "typedef edge" },
	{ key: "typedef edge longlong" },
	{ key: "--dfs" },
	{ key: "--bfs" },
];

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
		if (v) data.flags.push(psFlagOptions[i].key);
	});

	return data;
}

export const handlePsProject = (flags: Flag[]) => {};

export const run = async () => {
	const input = await fetchInput();
	const rootDir = path.join(__dirname, "..");
	mkdir(rootDir, input.projname);
	if (input.op === "ps (cpp)") {
	}
	// touch(path.join(rootDir, input.projname), "main.cpp");
};
