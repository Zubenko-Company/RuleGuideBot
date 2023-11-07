type CreateModelOptions = {
	name: string;
	situations: string[];
	rules: string[];
};

export const createModels = (...models: CreateModelOptions[]) =>
	models;
