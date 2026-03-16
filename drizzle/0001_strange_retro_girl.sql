ALTER TABLE "user" DROP CONSTRAINT "user_keycloak_id_unique";--> statement-breakpoint
DROP INDEX "username_idx";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "keycloak_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "username";