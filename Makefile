default: help

env ?= development

cnf ?= $(PWD)/deployment/config/$(env)/.env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))



DEPLOYMENT_DIR 						:= deployment
DEPLOYMENT_CONFIG_DIR 				:= $(DEPLOYMENT_DIR)/config
DEPLOYMENT_DOCKER_COMPOSE 			:= $(DEPLOYMENT_DIR)/docker-compose.yml
DEPLOYMENT_DOCKER_COMPOSE_OVERRIDE 	:= $(DEPLOYMENT_DIR)/docker-compose.$(NODE_ENV).yml


BLACK        := $(shell echo "\033[30m")
RED          := $(shell echo "\033[31m")
GREEN        := $(shell echo "\033[32m")
YELLOW       := $(shell echo "\033[33m")
LIGHTPURPLE  := $(shell echo "\033[34m")
PURPLE       := $(shell echo "\033[35m")
BLUE         := $(shell echo "\033[36m")
WHITE        := $(shell echo "\033[37m")

RESET := $(shell echo "\033[0m")

compose: ## - Run docker-compose with default config (Example: make compose env=local args="up")
	@echo "${TARGET_COLOR} Start dc !${RESET}"
	@docker network create ${DEFAULT_NETWORK} || true
	docker-compose -p ${APP_NAME}_${NODE_ENV} --env-file=${cnf} -f ${DEPLOYMENT_DOCKER_COMPOSE} -f ${DEPLOYMENT_DOCKER_COMPOSE_OVERRIDE} $(args)
	@echo "${TARGET_COLOR} End dc !${RESET}"

migration-generate:
	docker exec -i app-backend npm run migration:generate -- $(name) -o

migration-run:
	docker exec -i app-backend npm run migration:run