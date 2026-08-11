all:
	@mkdir -p /home/$$USER/data/mariadb
	@mkdir -p /home/$$USER/data/nginx
	@mkdir -p /home/$$USER/data/frontend
	@docker compose -f srcs/docker-compose.yml up -d --build

up:
	@docker compose -f srcs/docker-compose.yml up -d

down:
	@docker compose -f srcs/docker-compose.yml down

restart: down up

clean:
	@docker compose -f srcs/docker-compose.yml down -v --remove-orphans
	@rm -rf /home/$$USER/data

fclean: clean
	@docker system prune -af --volumes

re: fclean all

.PHONY: all fclean clean re up down restart
