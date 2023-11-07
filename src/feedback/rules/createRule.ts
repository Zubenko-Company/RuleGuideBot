type CreateRuleOptions = {
	name: string;
	correctWay: string;
	incorrectWay: string;
};

export const createRules = (...rules: CreateRuleOptions[]) =>
	rules;
