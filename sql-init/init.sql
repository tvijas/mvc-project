ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

create schema if not exists `library`;

CREATE TABLE if not exists `library`.`books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_image` longtext NOT NULL,
  `book_name` varchar(45) NOT NULL,
  `book_genre` varchar(45) NOT NULL,
  `book_description` varchar(1000) NOT NULL,
  `book_author` varchar(45) NOT NULL,
  `book_rating` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE if not exists `library`.`users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_token` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci