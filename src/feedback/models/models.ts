import { createModels } from './createModel';

export const MODELS = createModels(
	{
		name: '«Бутерброд»',
		situations: [
			`В беседах при постановке целей`,
			`При корректировке целей и результатов`,
			`Для развития конкретного навыка сотрудника`,
			`Обычно НЕ применяется для дисциплинарных бесед, ситуаций, связанных с нарушениями, где требуется корректировка поведения сотрудника`,
		],
		rules: [
			`Положительная оценка действий сотрудника`,
			`Обсуждение того, что требует улучшений и изменений`,
			`Завершение беседы на позитиве`,
		],
	},
	{
		name: 'BOFF',
		situations: [
			`Нарушение дисциплины`,
			`Равнодушие, Небрежность в работе`,
			`Некорректном поведении сотрудника с угрозой снижения результатов работы коллектива`,
		],
		rules: [
			`Поведение: изложите факты и конкретную информацию из наблюдений за неэффективной работой сотрудника, обсудите причины`,
			`Результаты: обсудите влияние поведения сотрудника на результаты бизнеса, последствия действий сотрудника`,
			`Чувства: скажите о вашем эмоциональном отношении к произошедшему`,
			`Будущее: запланируйте с сотрудником действия для того, чтобы исправить ситуацию/не допустить ее в будущем`,
		],
	},
	{
		name: 'SOR',
		situations: [
			`В ситуациях, когда сотрудник нарушает установленные в компании/подразделении/департаменте правила и регламенты`,
		],
		rules: [
			`Стандарт – напомните сотруднику об установленных в компании стандартах`,
			`Наблюдение – изложите факты и наблюдения за действиями сотрудника`,
			`Результат обсудите влияние поведения на бизнес/команду/клиентов/коллег. В итоге договоритесь с сотрудником о том, какие обязательства он на себя возьмет по изменению поведения`,
		],
	},
	{
		name: 'SLS',
		situations: [
			`Хорошо встраивается в командную работу проектных групп при проведении итоговых или промежуточныхрезультатов`,
			`При проведении собрания коллектива и потребности в самодиагностике`,
			`Для анализа сотрудником собственной эффективности, качества своей работы и ее результатов`,
			`Для подведения итогов адаптационного периода`,
		],
		rules: [
			`Успехи – попросите сотрудника поделиться о том, что он считает самыми важными личными достижениями в ходе работы`,
			`Уроки– попросите сотрудника поделиться о том, что он считает самым важным уроком, который он извлек в ходе работы`,
			`Изменения – спросите сотрудника, какое важное изменение, на его взгляд, ему необходимо сделать в дальнейшем в своей работе`,
		],
	},
);
