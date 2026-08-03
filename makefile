.PHONY: stop clean run fire

run:
	ENV=$(word 2,$(MAKECMDGOALS)); \
	if [ -d "./_env/$$ENV" ]; then \
		cd ./_env/$$ENV ; \
		docker compose --env-file .env up --build -d ; \
		cd ../.. ; \
	else \
		echo "Unknown environment: $$ENV"; \
	fi

stop:
	ENV=$(word 2,$(MAKECMDGOALS)); \
	if [ -d "./_env/$$ENV" ]; then \
		cd ./_env/$$ENV ; \
		docker compose down ; \
		cd ../.. ; \
	else \
		echo "Unknown environment: $$ENV"; \
	fi

clean:
	docker system prune -af --volumes;

# fire:
# 	docker stop $(shell docker ps -a -q) || true;
# 	docker system prune -af --volumes; \
