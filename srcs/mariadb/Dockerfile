FROM debian:trixie

WORKDIR /usr/matcha/app

COPY package.json .

RUN apt update -y && apt upgrade -y && apt install -y mariadb-server mariadb-client npm nodejs
RUN npm install

COPY 50-server.cnf /etc/mysql/mariadb.conf.d/
COPY init.sql /etc/mysql/
COPY scripts .

RUN mkdir -p /run/mysqld
RUN chown -R mysql:mysql /run/mysqld

COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 3001

ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "npm", "start" ]
