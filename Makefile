all:
	@mkdir -p /home/${USER}/data/frontend /home/${USER}/data/mariadb
	@docker compose -f docker-compose.yml up -d --build

up:
	@docker compose -f docker-compose.yml up -d

down:
	@docker compose -f docker-compose.yml down

restart: down up

clean:
	@docker compose -f docker-compose.yml down -v --remove-orphans
	@docker run --rm -v /home/${USER}:/maria alpine chown -R 0:0 /maria
	@rm -rf /home/${USER}/data

fclean: clean
	@docker system prune -af --volumes

re: fclean all

.PHONY: all fclean clean re up down restart
