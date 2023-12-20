PORTAINER_DOTENV=stack.env;
if [ -f $PORTAINER_DOTENV ]; then
	echo "Копируем $PORTAINER_DOTENV в .env";
	cp $PORTAINER_DOTENV .env;
fi

echo "Запускаем бота"
yarn install --frozen-lockfile
yarn serve