CREATE TYPE "car_color" AS ENUM (
  'white',
  'black',
  'brown',
  'yellow',
  'red',
  'blue',
  'silver'
);

CREATE TABLE "role" (
  "id" uuid PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL
);

CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar,
  "middle_name" varchar,
  "role_id" uuid NOT NULL,
  "created_at" timestamp NOT NULL,
  "phone" integer NOT NULL,
  "email" varchar NOT NULL
);

CREATE TABLE "driver" (
  "id" uuid PRIMARY KEY,
  "car_id" uuid NOT NULL,
  "user_id" uuid NOT NULL
);

CREATE TABLE "settlement" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "coordinates" bytea NOT NULL
);

CREATE TABLE "road" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "path" bytea[] NOT NULL
);

CREATE TABLE "way" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "departure_settlement_id" uuid NOT NULL,
  "destination_settlement_id" uuid NOT NULL
);

CREATE TABLE "road_to_way" (
  "road_id" uuid NOT NULL,
  "way_id" uuid NOT NULL
);

CREATE TABLE "refuel" (
  "id" uuid PRIMARY KEY,
  "price" bigint NOT NULL,
  "created_at" timestamp NOT NULL,
  "date_time" timestamp NOT NULL,
  "fuel_station_id" uuid NOT NULL,
  "car_id" uuid NOT NULL,
  "driver_id" uuid NOT NULL
);

CREATE TABLE "fuel_station" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "coordinates" bytea NOT NULL
);

CREATE TABLE "incident" (
  "id" uuid PRIMARY KEY,
  "description" varchar NOT NULL,
  "created_at" timestamp NOT NULL,
  "date_time" timestamp NOT NULL,
  "car_id" uuid NOT NULL,
  "driver_id" uuid NOT NULL,
  "coordinates" bytea NOT NULL
);

CREATE TABLE "work_slot" (
  "id" uuid PRIMARY KEY,
  "started_at" timestamp NOT NULL,
  "finished_at" timestamp NOT NULL,
  "car_id" uuid NOT NULL,
  "driver_id" uuid NOT NULL,
  "start_coordinates" bytea NOT NULL,
  "end_coordinates" bytea NOT NULL
);

CREATE TABLE "car" (
  "id" uuid PRIMARY KEY,
  "mark_id" uuid NOT NULL,
  "model_id" uuid NOT NULL,
  "plate_number" varchar UNIQUE NOT NULL,
  "color" car_color NOT NULL
);

CREATE TABLE "car_mark" (
  "id" uuid PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL
);

CREATE TABLE "car_model" (
  "id" uuid PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL
);

CREATE TABLE "order" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "created_at" timestamp NOT NULL,
  "departure_settlement_id" uuid NOT NULL,
  "destination_settlement_id" uuid NOT NULL,
  "weight" decimal NOT NULL,
  "volume" decimal NOT NULL,
  "price" bigint NOT NULL
);

CREATE TABLE "payment" (
  "id" uuid PRIMARY KEY,
  "created_at" timestamp NOT NULL,
  "order_id" uuid NOT NULL
);

ALTER TABLE "payment" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "driver" ADD FOREIGN KEY ("car_id") REFERENCES "car" ("id");

ALTER TABLE "driver" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("departure_settlement_id") REFERENCES "settlement" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("destination_settlement_id") REFERENCES "settlement" ("id");

ALTER TABLE "car" ADD FOREIGN KEY ("model_id") REFERENCES "car_model" ("id");

ALTER TABLE "car" ADD FOREIGN KEY ("mark_id") REFERENCES "car_mark" ("id");

ALTER TABLE "work_slot" ADD FOREIGN KEY ("driver_id") REFERENCES "driver" ("id");

ALTER TABLE "work_slot" ADD FOREIGN KEY ("car_id") REFERENCES "car" ("id");

ALTER TABLE "incident" ADD FOREIGN KEY ("driver_id") REFERENCES "driver" ("id");

ALTER TABLE "incident" ADD FOREIGN KEY ("car_id") REFERENCES "car" ("id");

ALTER TABLE "refuel" ADD FOREIGN KEY ("driver_id") REFERENCES "driver" ("id");

ALTER TABLE "refuel" ADD FOREIGN KEY ("car_id") REFERENCES "car" ("id");

ALTER TABLE "refuel" ADD FOREIGN KEY ("fuel_station_id") REFERENCES "fuel_station" ("id");

ALTER TABLE "road_to_way" ADD FOREIGN KEY ("road_id") REFERENCES "road" ("id");

ALTER TABLE "road_to_way" ADD FOREIGN KEY ("way_id") REFERENCES "way" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "way" ADD FOREIGN KEY ("departure_settlement_id") REFERENCES "settlement" ("id");

ALTER TABLE "way" ADD FOREIGN KEY ("destination_settlement_id") REFERENCES "settlement" ("id");