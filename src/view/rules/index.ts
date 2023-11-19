import { Markup, Scenes } from 'telegraf';
import { RULES, RuleType } from '@models/all';
import { RulePrettify } from '@viewmodel/all';
import { InformerContext } from '@view/context';

export const SceneFeedbackRules =
	new Scenes.BaseScene<InformerContext>('feedbackRules');

const makeRuleListEntry = (rule: RuleType, i: number) =>
	`${i + 1}. ${rule.name}`;

SceneFeedbackRules.enter(async (ctx) => {
	ctx.reply(
		'Семь основных правил обратной связи👩🏼‍💻:\n\n' +
			RULES.map(makeRuleListEntry).join('\n'),
		Markup.keyboard([
			...RULES.map((r, i) => [makeRuleListEntry(r, i)]),
			['Назад'],
		]).resize(),
	);
});

RULES.map((rule, index) => {
	SceneFeedbackRules.hears(
		makeRuleListEntry(rule, index),
		(ctx) =>
			ctx.replyWithMarkdownV2(RulePrettify.prettify(rule)),
	);
});

SceneFeedbackRules.hears('Назад', (ctx) =>
	ctx.navigator.goto('MainMenu'),
);
