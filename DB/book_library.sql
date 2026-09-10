-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2026 at 03:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo_img` varchar(255) DEFAULT NULL,
  `status_display` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `author_name`, `description`, `photo_img`, `status_display`, `createdAt`, `updatedAt`) VALUES
(1, 'J.K. Rowling', 'J.K. Rowling', 'uploads/1789046748090-925674464.webp', 1, '2026-09-10 20:25:48', '2026-09-10 20:25:48'),
(2, 'Rick Riordan', 'นักเขียนชาว อเมริกันซึ่งเป็นที่รู้จักกันดีจากการเขียนนวนิยายชุดเพอร์ซีย์', 'uploads/1789047973400-626039923.jpg', 1, '2026-09-10 20:46:13', '2026-09-10 20:46:13');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `cate_id` int(11) NOT NULL,
  `thumnail` varchar(255) DEFAULT NULL,
  `publish_year` int(11) NOT NULL,
  `status_display` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `author_id`, `cate_id`, `thumnail`, `publish_year`, `status_display`, `createdAt`, `updatedAt`) VALUES
(1, 'Harry Potter : แฮร์รี่ พอตเตอร์ กับศิลาอาถรรพ์', 'แฮร์รี่ พอตเตอร์ กับศิลาอาถรรพ์', 1, 1, 'uploads/1789046774702-483154703.webp', 2026, 1, '2026-09-10 20:26:14', '2026-09-10 20:26:14'),
(2, 'เพอร์ซีย์ แจ็กสัน 7 กับโทสะแห่งเทพีสามเศียร', 'โทสะแห่งเทพีสามเศียร', 2, 2, 'uploads/1789047976205-219769640.webp', 2026, 1, '2026-09-10 20:46:16', '2026-09-10 20:46:16');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `cate_title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `priority` int(11) NOT NULL,
  `status_display` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `cate_title`, `description`, `priority`, `status_display`, `createdAt`, `updatedAt`) VALUES
(1, 'นวนิยายแฟนตาซี', 'นวนิยายแฟนตาซี', 1, 1, '2026-09-10 20:24:03', '2026-09-10 20:24:03'),
(2, 'นิยายแฟนตาซีไซไฟ', 'นิยายแฟนตาซีไซไฟ', 2, 1, '2026-09-10 20:45:24', '2026-09-10 20:45:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `access_token` text NOT NULL,
  `status_confirm` varchar(10) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `access_token`, `status_confirm`, `display_name`, `profile_img`, `status`) VALUES
(1, 'admin123', '$2b$10$1rb0NpUFM1lmxtZthlTazuZh78CZpNp/z2lAvY5Lkyux/Nh.w7jFy', 'admin@example.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbjEyMyIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJhY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNk1Td2lkWE5sY201aGJXVWlPaUpoWkcxcGJqRXlNeUlzSW1WdFlXbHNJam9pWVdSdGFXNUFaWGhoYlhCc1pTNWpiMjBpTENKcFlYUWlPakUzT0Rrd05EZ3hNVGdzSW1WNGNDSTZNVGM0T1RFek5EVXhPSDAuX0gxekVzZXEzWThDNWhHVFRRN1Atbi14Sk1JTUZmbzl6WDF0VUI4bzFwayIsImlhdCI6MTc4OTA0ODExOCwiZXhwIjoxNzg5MTM0NTE4fQ.ZXCDKwBJS8Qd7c2QFzeqduedmAvXRoXQcS4U-lPmVEM', 'confirmed', 'admin', NULL, 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
