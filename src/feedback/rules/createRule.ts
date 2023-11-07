type CreateRuleOptions = {
	name: string;
	description: string;
};

export const createRules = (...rules: CreateRuleOptions[]) =>
	rules;
