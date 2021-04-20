import fs from "fs";
import path from "path";
import cpp from "./template/ps/cpp";
import webpack from "./template/webpack";
import { MessageFlux, MessageMono } from "@type/message";
import { execChild, execNodeCommand } from "./spawner";
import { print, println } from "./console";
import { Style } from "./color";
import { Operation, ProjectName, Flag, FlagOptions } from "@type/core";
import { TemplateGenerator } from "@type/template";
import { flagCheck } from "./template";

export const toAbsolutePath = (p: string): string => {
	return path.resolve(p);
};

export const template: { op: Operation; template: TemplateGenerator }[] = [
	{ op: "ps (cpp)", template: cpp },
	{ op: "webpack", template: webpack },
];

export const opOptions: Operation[] = ["ps (cpp)", "webpack"];
export const psFlagOptions: FlagOptions = [
	{ key: "default", needsValue: false },
	{ key: "no global using namespace std", needsValue: false },
	{ key: "no setup func", needsValue: false },
	{ key: "no solve func", needsValue: false },
	{ key: "only main func", needsValue: false },
	{ key: "no fastio", needsValue: false },
	{ key: "typedef coord", needsValue: false },
	{ key: "typedef edge", needsValue: false },
	{ key: "typedef edge longlong", needsValue: false },
	{ key: "add README.md", needsValue: false },
	// { key: "global variables", needsValue: true },
	// { key: "#define MAX", needsValue: true },
	// { key: "#define MOD", needsValue: true },
];

export type GenSource = {
	op: Operation;
	projname: ProjectName;
	flags: FlagOptions;
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

export const touch = (loc: string, fileName: string, content: string): void => {
	fs.writeFile(path.join(loc, fileName), content, (err) => {
		if (err) console.log(err);
	});
};

export async function fetchInput(): Promise<GenSource> {
	const data: GenSource = {
		op: null,
		projname: null,
		flags: [],
	};

	const msg1 = await execNodeCommand(path.join(__dirname, "op/process.js"));
	data.op = opOptions[(msg1 as MessageMono).selected];

	const msg2 = await execNodeCommand(
		path.join(__dirname, "projname/process.js")
	);
	data.projname = (msg2 as MessageMono).input;

	if (data.op.split(" ")[0] === "ps") {
		const msg3 = await execNodeCommand(
			path.join(__dirname, "flags/ps/process.js")
		);
		(msg3 as MessageFlux).selected.forEach((v, i) => {
			if (v) data.flags.push(psFlagOptions[i]);
		});
	} else {
		const msg3 = await execNodeCommand(
			path.join(__dirname, "flags/webpack/process.js")
		);
	}

	return data;
}

export const handlePsCppProject = (input: GenSource) => {
	const rootDir = toAbsolutePath(".");
	mkdir(rootDir, input.projname);
	touch(path.join(rootDir, input.projname), "main.cpp", cpp(input.flags));
	if (flagCheck(input.flags, "add README.md")) {
		touch(path.join(rootDir, input.projname), "README.md", "");
	}
};

export const handleWebpackProject = async (input: GenSource) => {
	const rootDir = toAbsolutePath(".");
	await execChild("git", [
		"clone",
		"https://github.com/rudy3091/ts-scss-boilerplate.git",
	]);
	await execChild("mv", ["ts-scss-boilerplate", input.projname]);
	await execChild("rm", ["-rf", path.join(input.projname, ".git")]);
};

export const run = async () => {
	const input = await fetchInput();
	if (input.op === "ps (cpp)") handlePsCppProject(input);
	else if (input.op === "webpack") handleWebpackProject(input);
};
