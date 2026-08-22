FRONTEND = ./frontend
BACKEND = ./backend

FRONTEND_PID = ./frontend/.pid
BACKEND_PID = ./backend/.pid

FRONTEND_LOGS = ./frontend/frontend-logs.txt
BACKEND_LOGS = ./backend/backend-logs.txt

FRONTEND_UP = echo "$(LIGHT_GREEN)Frontend UP!$(RESET)"
FRONTEND_DOWN = echo "$(YELLOW)Frontend DOWN!$(RESET)"
FRONTEND_NOT_RUNNING = echo "$(YELLOW)Frontend is not running.$(RESET)"
FRONTEND_ALREADY_RUNNING = echo "$(YELLOW)Frontend is already running.$(RESET)"
BACKEND_UP = echo "$(LIGHT_GREEN)Backend UP!$(RESET)"
BACKEND_DOWN = echo "$(YELLOW)Backend DOWN!$(RESET)"
BACKEND_NOT_RUNNING = echo "$(YELLOW)Backend is not running.$(RESET)"
BACKEND_ALREADY_RUNNING = echo "$(YELLOW)Backend is already running.$(RESET)"

INSTALL_DONE = @echo "$(LIGHT_GREEN)Project installed!$(RESET)"

# Colors
LIGHT_GREEN	= \033[1;32m
RESET = \033[0m
YELLOW = \033[33;1m

up: frontend-up backend-up

down: frontend-down backend-down

install:
	. ~/.nvm/nvm.sh && nvm install 20
	@cd $(FRONTEND) && npm install
	@cd $(BACKEND) && npm install
	$(INSTALL_DONE)

frontend-up:
	@if [ ! -s "$(FRONTEND_PID)" ]; then \
		. ~/.nvm/nvm.sh && nvm use 20 1>/dev/null && \
		setsid sh -c 'cd "$(FRONTEND)" && exec npm run dev' \
			> "$(FRONTEND_LOGS)" 2>&1 < /dev/null & \
		PID=$$!; \
		echo $$PID > "$(FRONTEND_PID)"; \
		$(FRONTEND_UP); \
	else \
		$(FRONTEND_ALREADY_RUNNING); \
	fi

backend-up:
	@if [ ! -s "$(BACKEND_PID)" ]; then \
		. ~/.nvm/nvm.sh && nvm use 20 1>/dev/null && \
		setsid sh -c 'cd "$(BACKEND)" && exec npm start' \
			> "$(BACKEND_LOGS)" 2>&1 < /dev/null & \
		PID=$$!; \
		echo $$PID > "$(BACKEND_PID)"; \
		$(BACKEND_UP); \
	else \
		$(BACKEND_ALREADY_RUNNING); \
	fi

frontend-logs:
	@cat $(FRONTEND_LOGS)

backend-logs:
	@cat $(BACKEND_LOGS)

frontend-down:
	@if [ -s "$(FRONTEND_PID)" ]; then \
		PID=$$(cat "$(FRONTEND_PID)"); \
		kill -- -$$PID 2>/dev/null; \
		$(FRONTEND_DOWN); \
		rm -f "$(FRONTEND_PID)"; \
	else \
		$(FRONTEND_NOT_RUNNING); \
	fi

backend-down:
	@if [ -s "$(BACKEND_PID)" ]; then \
		PID=$$(cat "$(BACKEND_PID)"); \
		$(BACKEND_DOWN); \
		kill $$PID 2>/dev/null; \
		rm -f "$(BACKEND_PID)"; \
	else \
		$(BACKEND_NOT_RUNNING); \
	fi

clean: frontend-down backend-down
	@rm -rf $(FRONTEND_LOGS)
	@rm -rf $(FRONTEND_PID)
	@rm -rf $(BACKEND_LOGS)
	@rm -rf $(BACKEND_PID)

.PHONY: install up down frontend-up frontend-down backend-up backend-down frontend-logs backend-logs clean
