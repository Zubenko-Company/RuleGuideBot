import { button, keyboard } from 'telegraf/typings/markup';

export const buildSetupKeyboard = () => {
	return keyboard([button.text('Test')]);
};
