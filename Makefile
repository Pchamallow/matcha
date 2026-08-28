all:
	@docker compose -f docker-compose.yml up -d --build

up:
	@docker compose -f docker-compose.yml up -d

down:
	@docker compose -f docker-compose.yml down

restart: down up

logs:
	docker compose logs

logs-frontend:
	docker compose logs frontend

logs-frontend:
	docker compose logs backend

clean:
	@docker compose -f docker-compose.yml down -v --remove-orphans

fclean: clean
	@docker system prune -af --volumes

re: fclean all

reclean: clean all

.PHONY: all fclean clean re
