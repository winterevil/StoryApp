-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: story_app
-- ------------------------------------------------------
-- Server version	8.0.38

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Truyện tình cảm nhẹ nhàng, cảm động','Ngôn tình'),(2,'Truyện phiêu lưu, mạo hiểm, chiến đấu','Hành động'),(3,'Truyện mang yếu tố vui nhộn, giải trí','Hài hước'),(4,'Truyện về công nghệ, tương lai, không gian','Khoa học viễn tưởng'),(5,'Truyện rùng rợn, bí ẩn và đáng sợ','Kinh dị');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `chapter_number` int NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `story_id` bigint DEFAULT NULL,
  `content` longtext,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKh4i8axms6ubfkkett7v9cxvjl` (`story_id`),
  CONSTRAINT `FKh4i8axms6ubfkkett7v9cxvjl` FOREIGN KEY (`story_id`) REFERENCES `stories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,1,1,'Một buổi sáng mùa hè, cô gái gặp cậu học trò bên bờ sông...','Chương 1: Gặp gỡ đầu tiên'),(2,2,1,'Cơn mưa đến bất chợt, và hai người trú mưa cùng nhau dưới mái hiên nhỏ...','Chương 2: Cơn mưa bất ngờ'),(3,3,1,'Mùa hè kết thúc, cô gái rời đi để lại nhiều kỷ niệm...','Chương 3: Lời tạm biệt'),(1,4,2,'Một thành phố chìm trong bóng tối, một anh hùng xuất hiện...','Chương 1: Sự trỗi dậy'),(2,5,2,'Anh hùng đối mặt với kẻ thù đầu tiên của mình...','Chương 2: Kẻ thù trong bóng đêm'),(1,6,3,'Anh chàng hậu đậu làm đổ nước mắm lên áo sếp trong buổi tiệc công ty...','Chương 1: Bữa ăn thảm họa'),(2,7,3,'Một buổi phỏng vấn việc làm nhưng lại hóa thành buổi tấu hài...','Chương 2: Buổi phỏng vấn nhớ đời'),(1,8,4,'Một nhà khoa học phát hiện ra cách du hành vượt không gian và thời gian...','Chương 1: Cỗ máy thời gian'),(2,9,4,'AI trở nên vượt trội và bắt đầu thống trị con người...','Chương 2: Cuộc chiến của trí tuệ nhân tạo'),(1,10,5,'Một tiếng la vọng lên từ khu rừng, mở đầu cho chuỗi sự kiện bí ẩn...','Chương 1: Tiếng gọi trong đêm'),(2,11,5,'Những ánh sáng ma quái xuất hiện mỗi đêm...','Chương 2: Ánh sáng lạ giữa rừng sâu'),(3,12,5,'Ngôi làng bị ám bởi lời nguyền hàng trăm năm...','Chương 3: Lời nguyền cổ xưa');
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stories` (
  `category_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpd0ghq7jfq6im4r8g14k7marl` (`category_id`),
  CONSTRAINT `FKpd0ghq7jfq6im4r8g14k7marl` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` VALUES (1,1,'Nguyễn Nhật Ánh','https://i.imgur.com/aN9tFZj.jpg','Câu chuyện học trò nhẹ nhàng trong những ngày hè đầy nắng.','Tình Yêu Gió Hạ'),(2,2,'Trần Văn Bảo','https://i.imgur.com/W6qOqK3.jpg','Một chiến binh mang mặt nạ chiến đấu vì công lý.','Anh Hùng Mặt Nạ'),(3,3,'Lê Hữu Phước','https://i.imgur.com/q7RjKUP.jpg','Tổng hợp những mẩu chuyện ngắn cười té ghế.','Những Chuyện Cười Dở Khóc Dở'),(4,4,'Minh Tùng','https://i.imgur.com/Nm9n3KP.jpg','Hành trình của con người trong thế giới tương lai xa.','Thế Giới 3000'),(5,5,'Lê Anh Tuấn','https://i.imgur.com/R1pMxOP.jpg','Một câu chuyện kinh dị về khu rừng ma ám.','Bóng Ma Trong Rừng');
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alice@gmail.com','Alice Nguyễn','123456','alice'),(2,'bob@gmail.com','Bob Trần','123456','bob'),(3,'charlie@gmail.com','Charlie Lê','123456','charlie');
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

-- Dump completed on 2025-11-13 14:12:56
