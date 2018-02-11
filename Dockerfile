FROM resin/raspberry-pi-node:onbuild

COPY . .
RUN npm install


EXPOSE 3000

CMD [ "npm", "start"]
