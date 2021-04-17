-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(13,2) NOT NULL,
  PRIMARY KEY (`cart_id`,`product_id`),
  KEY `FK_cart_items_products_idx` (`product_id`),
  CONSTRAINT `FK_cart_items_carts` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `FK_cart_items_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,5,3,19.50),(1,9,4,19.60),(1,11,2,40.00),(2,1,1,5.94),(2,3,1,10.40),(3,2,1,5.90),(3,12,1,14.90),(4,3,2,25.80),(4,5,6,32.50),(4,35,1,3.50);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `date_created` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_users_carts_idx` (`user_id`),
  CONSTRAINT `FK_users_carts` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,3,'2021-02-08'),(2,3,'2021-03-17'),(3,3,'2021-03-20'),(4,123456789,'2021-03-20'),(49,121212121,'2021-04-13');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,'Bakery'),(5,'Beverages'),(3,'Dairy'),(1,'Fruit'),(4,'Meat'),(2,'Vegetables');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cart_id` bigint NOT NULL,
  `total_price` decimal(13,2) NOT NULL,
  `city` varchar(120) NOT NULL,
  `street` varchar(120) NOT NULL,
  `order_date` date NOT NULL,
  `delivery_date` date NOT NULL,
  `payment_method` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_orders_carts_idx` (`cart_id`),
  CONSTRAINT `FK_orders_carts` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,79.10,'Tel Aviv','Hashiv\'a 3','2021-02-08','2021-02-10','4231'),(2,2,16.34,'Kiryat Gat','HaMapilim 5','2021-03-17','2021-04-01','4231'),(5,4,61.80,'Haifa','Masada 30 a','2021-03-20','2021-03-22','4231');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `category_id` bigint NOT NULL,
  `unit_price` decimal(13,2) NOT NULL,
  `image_url` varchar(225) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_products_categories_idx` (`category_id`),
  CONSTRAINT `FK_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Milk',3,5.94,'https://www.freshdirect.com/media/images/product/dairy_16/dai_pid_2002513_j.jpg?lastModify=2018-01-09'),(2,'Lemon',1,5.90,'https://pngimg.com/uploads/lemon/lemon_PNG25198.png'),(3,'Oat Milk',3,12.90,'https://www.freshdirect.com//media/images/product/dairy_16/dai_pid_2004797_j.jpg?lastModify=2020-01-21'),(4,'Eggs',3,10.40,'https://www.freshdirect.com/media/images/product/dairy_16/dai_pid_2002541_j.jpg?lastModify=2018-01-12'),(5,'Coca Cola',5,6.50,'https://i.pinimg.com/originals/5b/18/f4/5b18f4d90c6989cbd1dc984c3a9efa42.png'),(6,'Sprite',5,6.70,'https://toppng.com/uploads/preview/sprite-png-background-image-sprite-2-litros-11563213791va1ufu6ssi.png'),(7,'FuzeTea Lemon ',5,6.90,'https://www.vhv.rs/dpng/d/323-3232765_fuze-tea-black-lemon-png-transparent-png.png'),(8,'Coca Cola Zero',5,6.70,'https://www.nicepng.com/png/detail/84-847693_coca-cola-clipart-330ml-png-coca-cola-zero.png'),(9,'Greek Yogurt',3,4.90,'https://www.pngkit.com/png/detail/138-1388947_yogurt-png-transparent-picture-yoplait-greek-yogurt.png'),(10,'Banana',1,5.90,'https://img.favpng.com/3/9/22/banana-powder-fruit-cavendish-banana-png-favpng-QzfrrBFJCSeStyTQ6GVReXvSu.jpg'),(11,'Strawberry',1,20.00,'https://banner2.cleanpng.com/20171216/3e7/strawberry-png-images-5a35d92b58be29.4864872015134784433635.jpg'),(12,'Avocado',1,14.90,'https://toppng.com/uploads/preview/avocado-11526067324c2ctzkvu8d.png'),(13,'Orange',1,5.90,'https://e7.pngegg.com/pngimages/555/204/png-clipart-orange-juice-tea-fruit-orange-natural-foods-food.png'),(31,'Cucumber',2,5.90,'https://www.pngfind.com/pngs/m/27-278250_cucumber-png-cucumber-transparent-cucumber-png-png-download.png'),(32,'Tomato',2,5.90,'https://freepngimg.com/thumb/tomato/6-tomato-png-image.png'),(33,'Onion',2,4.90,'https://pngimg.com/uploads/onion/onion_PNG608.png'),(35,'Semolina Demi Baguette',6,3.50,'https://i.pinimg.com/originals/f7/f7/d8/f7f7d87f76d472963756c35c1c47cfbe.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `first_name` varchar(70) NOT NULL,
  `last_name` varchar(70) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(70) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  `city` varchar(120) DEFAULT NULL,
  `street` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Dekel','Atzami','dekelat@gmail.com','62f40c675a55b4b401cffd0c452b7038','ADMIN',NULL,NULL),(3,'Shifra','Bilya','shifshif@gmail.com','62f40c675a55b4b401cffd0c452b7038','CUSTOMER','Tel Aviv','Hashiv\'a 3'),(121212121,'Jacob','Cohen','jake@walla.com','e3b40a4fb0c96e2ed1134d14c24fb4f3','CUSTOMER','Ashdod','Ha\'Egoz 5'),(123456789,'Dolev','Atzami','dude@ac.com','e3b40a4fb0c96e2ed1134d14c24fb4f3','CUSTOMER','Haifa','Masada 30 a'),(204204101,'Lilach','Krasner','de@jh.il','e3b40a4fb0c96e2ed1134d14c24fb4f3','CUSTOMER','Be\'er Sheva','Tzorfim 6/2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-15 13:07:15
