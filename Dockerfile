FROM node:18-alpine

WORKDIR /RuleGuideBot

COPY . /RuleGuideBot

CMD sh ./deploy.sh
