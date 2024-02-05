type AlgoritmType = {
	imageSource: string;
	info: string;
};

export type FeedbackType = {
	name: string;
	situations: string;
	rules: string[];
	tag: string;
	algoritm: AlgoritmType;
	example: string[];
};
