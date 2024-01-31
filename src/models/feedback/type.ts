import * as fs from 'fs';

type Algoritm = {
	imageSource: fs.ReadStream;
	info: string;
};

export type FeedbackType = {
	name: string;
	situations: string;
	rules: string[];
	tag: string;
	algoritm: Algoritm;
	example: string[];
};
