-- CreateTable

CREATE TABLE "users" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "name" TEXT NOT NULL,

    "slug" TEXT,

    "email" TEXT NOT NULL,

    "email_verified_at" DATETIME,

    "password" TEXT NOT NULL,

    "bio" TEXT,

    "is_admin" BOOLEAN DEFAULT false,

    "avatar_path" TEXT,

    "date_of_birth" DATETIME,

    "remember_token" TEXT,

    "created_at" DATETIME,

    "updated_at" DATETIME

);



-- CreateTable

CREATE TABLE "movies" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "title" TEXT NOT NULL,

    "slug" TEXT NOT NULL,

    "description" TEXT,

    "release_date" DATETIME,

    "director" TEXT,

    "genre" TEXT,

    "rating" REAL,

    "poster_path" TEXT,

    "imdb_id" TEXT,

    "added_by" INTEGER NOT NULL,

    "created_at" DATETIME,

    "updated_at" DATETIME,

    CONSTRAINT "movies_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION

);



-- CreateTable

CREATE TABLE "platforms" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "name" TEXT NOT NULL,

    "slug" TEXT NOT NULL,

    "url" TEXT,

    "url_template" TEXT,

    "added_by" INTEGER NOT NULL,

    "created_at" DATETIME,

    "updated_at" DATETIME,

    CONSTRAINT "platforms_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION

);



-- CreateTable

CREATE TABLE "movie_platform" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "movie_id" INTEGER NOT NULL,

    "platform_id" INTEGER NOT NULL,

    "external_id" TEXT,

    "url" TEXT,

    "created_at" DATETIME,

    "updated_at" DATETIME,

    CONSTRAINT "movie_platform_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,

    CONSTRAINT "movie_platform_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION

);



-- CreateTable

CREATE TABLE "comments" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "content" TEXT NOT NULL,

    "user_id" INTEGER NOT NULL,

    "commentable_type" TEXT NOT NULL,

    "commentable_id" INTEGER NOT NULL,

    "created_at" DATETIME,

    "updated_at" DATETIME,

    CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION

);



-- CreateTable

CREATE TABLE "faqs" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "question" TEXT NOT NULL,

    "answer" TEXT NOT NULL,

    "created_at" DATETIME,

    "updated_at" DATETIME

);



-- CreateTable

CREATE TABLE "favourite_movies" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "user_id" INTEGER NOT NULL,

    "movie_id" INTEGER NOT NULL,

    "created_at" DATETIME,

    "updated_at" DATETIME,

    CONSTRAINT "favourite_movies_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,

    CONSTRAINT "favourite_movies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION

);



-- CreateTable

CREATE TABLE "favourite_tv_shows" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "user_id" INTEGER NOT NULL,

    "tv_show_id" INTEGER NOT NULL,

    "created_at" DATETIME,

    "updated_at" DATETIME,

    CONSTRAINT "favourite_tv_shows_tv_show_id_fkey" FOREIGN KEY ("tv_show_id") REFERENCES "tv_shows" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,

    CONSTRAINT "favourite_tv_shows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION

);



-- CreateTable

CREATE TABLE "platform_tv_show" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "tv_show_id" INTEGER NOT NULL,

    "platform_id" INTEGER NOT NULL,

    "external_id" TEXT,

    "url" TEXT,

    "created_at" DATETIME,

    "updated_at" DATETIME,

    CONSTRAINT "platform_tv_show_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,

    CONSTRAINT "platform_tv_show_tv_show_id_fkey" FOREIGN KEY ("tv_show_id") REFERENCES "tv_shows" ("id") ON DELETE CASCADE ON UPDATE NO ACTION

);



-- CreateTable

CREATE TABLE "tv_shows" (

    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    "title" TEXT NOT NULL,

    "slug" TEXT NOT NULL,

    "description" TEXT,

    "release_date" DATETIME,

    "director" TEXT,

    "genre" TEXT,

    "rating" REAL,

    "poster_path" TEXT,

    "imdb_id" TEXT,

    "added_by" INTEGER NOT NULL,

    "created_at" DATETIME,

    "updated_at" DATETIME,

    CONSTRAINT "tv_shows_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION

);



-- CreateIndex

CREATE UNIQUE INDEX "users_name_unique" ON "users"("name");



-- CreateIndex

CREATE UNIQUE INDEX "users_slug_unique" ON "users"("slug");



-- CreateIndex

CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");



-- CreateIndex

CREATE UNIQUE INDEX "movies_slug_unique" ON "movies"("slug");



-- CreateIndex

CREATE UNIQUE INDEX "platforms_slug_unique" ON "platforms"("slug");



-- CreateIndex

CREATE UNIQUE INDEX "movie_platform_movie_id_platform_id_unique" ON "movie_platform"("movie_id", "platform_id");




CREATE INDEX "comments_commentable_type_commentable_id_index" ON "comments"("commentable_type", "commentable_id");



-- CreateIndex

CREATE UNIQUE INDEX "favourite_movies_user_id_movie_id_unique" ON "favourite_movies"("user_id", "movie_id");



-- CreateIndex

CREATE UNIQUE INDEX "favourite_tv_shows_user_id_tv_show_id_unique" ON "favourite_tv_shows"("user_id", "tv_show_id");



-- CreateIndex

CREATE UNIQUE INDEX "platform_tv_show_tv_show_id_platform_id_unique" ON "platform_tv_show"("tv_show_id", "platform_id");



-- CreateIndex

CREATE UNIQUE INDEX "tv_shows_slug_unique" ON "tv_shows"("slug");



