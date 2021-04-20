export const usingStd = `using namespace std;`;

export const max = (max) => `#define MAX ${max}`;
export const min = `#define MIN 2147483647`;

export const coord = (std: boolean) =>
	`typedef ${std ? "std::" : ""}pair<int, int> coord;`;
export const edge = (std: boolean) =>
	`typedef ${std ? "std::" : ""}tuple<int, int, int> edge;`;
export const edgeLong = (std: boolean) =>
	`typedef ${std ? "std::" : ""}tuple<int, int, long long> edge;`;

export const fastio = (std: boolean) =>
	`${std ? "std::" : ""}cin.tie(nullptr);
	${std ? "std::" : ""}ios_base::sync_with_stdio(false);`;
