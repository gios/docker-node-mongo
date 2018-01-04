FROM node:carbon

ENV HOME=/usr/src/app
RUN mkdir $HOME && chmod -R 0777 $HOME

WORKDIR $HOME
COPY package*.json $HOME/

RUN npm install
COPY . $HOME

EXPOSE 3000
CMD ["npm", "start"]