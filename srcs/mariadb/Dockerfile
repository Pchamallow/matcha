FROM debian:trixie

# PACKAGES
RUN apt update -y && apt upgrade -y && apt install -y mariadb-server mariadb-client gettext-base

COPY ./50-server.cnf /etc/mysql/mariadb.conf.d/
COPY ./init.sql.template .
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh
RUN mkdir -p /run/mysqld
RUN chown -R mysql:mysql /run/mysqld

EXPOSE 3306

ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "mysqld" ]
