import { createRules } from './createRule';

export const RULES = createRules(
	{
		name: 'Конкретная',
		correctWay: `Правильно: «Сергей, сегодня ты появился на работе в 10:45».`,
		incorrectWay: `Не правильно: «Ты вечно спишь до одиннадцати и вечно опаздываешь»`,
	},
	{
		name: 'Своевременная',
		correctWay: `Правильно: Ты только что закончила обслуживать этого клиента. Давай посмотрим, что удалось в этот раз.`,
		incorrectWay: `Не правильно: Помнишь, около двух недель назад ты обслуживала клиента. Давай разберем какую ошибку ты допустила.`,
	},
	{
		name: 'Основывайся на фактах',
		correctWay: `Правильно: Я заметила, что ты не стала рассказывать клиенту об условиях гарантийного обслуживания.`,
		incorrectWay: `Не правильно: Говорят, ты совсем перестала рассказывать клиентам об условиях гарантийного обслуживания.`,
	},
	{
		name: 'Вовлекай в обсуждение',
		correctWay: `Правильно: Как ты думаешь, что изменилось с нашего последнего разговора`,
		incorrectWay: `Не правильно: Я хотел бы дать оценку сделанной тобой работе`,
	},
	{
		name: 'Отмечай успехи',
		correctWay: `Правильно: Тебе так быстро удалось успокоить клиента – поделись опытом, как у тебя это получается.`,
		incorrectWay: `Не правильно: Замечательно, что ты успокоила клиента, а почему не рассказала о выгодной акции.`,
	},
	{
		name: 'Не переходи на личности',
		correctWay: `Правильно: Какое влияние могут оказать такие действия на команду?`,
		incorrectWay: `Не правильно: Ты эгоист, из-за тебя страдает команда.`,
	},
	{
		name: 'Не говори о том, что нельзя изменить',
		correctWay: `Правильно: Какие еще позитивные знаки внимания ты могла бы оказать этому клиенту?`,
		incorrectWay: `Не правильно: С таким голосом как у тебя расположения клиента не добьешься.`,
	},
);
