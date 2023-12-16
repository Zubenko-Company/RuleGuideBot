FROM node:18-alpine

WORKDIR /RuleGuideBot

COPY . /RuleGuideBot

CMD cp stack.env .env && yarn install --frozen-lockfile && yarn serve
