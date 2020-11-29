FROM node:12

RUN mkdir -p /workspace && \
    chown node /workspace && \
    chgrp node /workspace

USER node

WORKDIR /workspace

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /workspace/node_modules/.bin:/home/node/.npm-global/bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts -g

CMD ["npm", "start"]