SAIL_PATH=./back/vendor/bin/sail

.PHONY: init
init:
	cp back/.env.example back/.env
	docker compose up -d
	docker exec -it api-eventos-back-1 php artisan migrate --seed

.PHONY: install
start:
	docker compose up -d