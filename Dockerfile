FROM node:18-alpine

WORKDIR /RuleGuideBot

COPY . /RuleGuideBot

CMD yarn install --frozen-lockfile && yarn serve
