-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema emmaus_connect
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema emmaus_connect
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emmaus_connect` DEFAULT CHARACTER SET utf8 ;
USE `emmaus_connect` ;

-- -----------------------------------------------------
-- Table `emmaus_connect`.`model`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_connect`.`model` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `ram` VARCHAR(45) NOT NULL,
  `memory` VARCHAR(45) NOT NULL,
  `category` VARCHAR(15) NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `screenSize` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emmaus_connect`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_connect`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `isAdmin` TINYINT DEFAULT 0 NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
