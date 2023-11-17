import { Markup, Scenes } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { SceneMainMenu } from '@view/main';
import { RULES } from '@models/all';

export const SceneFeedbackRules =
	new Scenes.BaseScene<SceneContext>('feedbackRules');

SceneFeedbackRules.enter(async (ctx) => {
	await ctx.reply(
		'Семь основных правил обратной связи👩🏼‍💻:\n\n' +
			RULES.map(
				(rule, index) => index + 1 + '. ' + rule.name,
			).join('\n'),
		Markup.keyboard([
			...RULES.map((rule, index) => [
				index + 1 + '. ' + rule.name,
			]),
			['Назад'],
		]).resize(),
	);
});

RULES.map((rule, index) => {
	SceneFeedbackRules.hears(
		index + 1 + '. ' + rule.name,
		(ctx) => {
			ctx.replyWithMarkdownV2(
				`*${rule.name}*\n\n✅${rule.correctWay}\n\n❌${rule.incorrectWay}`,
			);
		},
	);
});

SceneFeedbackRules.hears('Назад', (ctx) => {
	ctx.scene.enter(SceneMainMenu.id);
});
