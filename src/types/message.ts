import { Context } from "@type/core";

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
