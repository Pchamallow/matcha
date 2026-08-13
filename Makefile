all:
	@docker compose -f docker-compose.yml up -d --build

up:
	@docker compose -f docker-compose.yml up -d

down:
	@docker compose -f docker-compose.yml down

restart: down up

clean:
	@docker compose -f docker-compose.yml down -v --remove-orphans

fclean: clean
	@docker system prune -af --volumes

re: fclean all

.PHONY: all fclean clean re up down restart
