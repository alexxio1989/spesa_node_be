-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema spesa
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema spesa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `spesa` DEFAULT CHARACTER SET utf8 ;
USE `spesa` ;

-- -----------------------------------------------------
-- Table `spesa`.`utente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spesa`.`utente` (
  `idutente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL DEFAULT NULL,
  `cognome` VARCHAR(45) NULL DEFAULT NULL,
  `username` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idutente`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spesa`.`market`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spesa`.`market` (
  `idmarket` INT NOT NULL AUTO_INCREMENT,
  `desc_market` VARCHAR(100) NULL DEFAULT NULL,
  `color_market` VARCHAR(50) NULL DEFAULT NULL,
  `utente_idutente` INT NOT NULL,
  PRIMARY KEY (`idmarket`),
  INDEX `fk_market_utente1_idx` (`utente_idutente` ASC) VISIBLE,
  CONSTRAINT `fk_market_utente1`
    FOREIGN KEY (`utente_idutente`)
    REFERENCES `spesa`.`utente` (`idutente`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spesa`.`type_prodotto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spesa`.`type_prodotto` (
  `idtype_prodotto` INT NOT NULL AUTO_INCREMENT,
  `desc_type_prodotto` VARCHAR(100) NULL DEFAULT NULL,
  `color_type_prodotto` VARCHAR(50) NULL DEFAULT NULL,
  `utente_idutente` INT NOT NULL,
  PRIMARY KEY (`idtype_prodotto`),
  INDEX `fk_type_prodotto_utente1_idx` (`utente_idutente` ASC) VISIBLE,
  CONSTRAINT `fk_type_prodotto_utente1`
    FOREIGN KEY (`utente_idutente`)
    REFERENCES `spesa`.`utente` (`idutente`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spesa`.`unita_misura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spesa`.`unita_misura` (
  `idunita_misura` INT NOT NULL AUTO_INCREMENT,
  `desc_unita_misura` VARCHAR(200) NULL DEFAULT NULL,
  `utente_idutente` INT NOT NULL,
  PRIMARY KEY (`idunita_misura`),
  INDEX `fk_unita_misura_utente1_idx` (`utente_idutente` ASC) VISIBLE,
  CONSTRAINT `fk_unita_misura_utente1`
    FOREIGN KEY (`utente_idutente`)
    REFERENCES `spesa`.`utente` (`idutente`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spesa`.`prodotto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spesa`.`prodotto` (
  `idprodotto` INT NOT NULL AUTO_INCREMENT,
  `nome_prodotto` VARCHAR(400) NOT NULL,
  `desc_prodotto` VARCHAR(400) NULL DEFAULT NULL,
  `prezzo_min` DECIMAL(10,2) NOT NULL,
  `prezzo_max` DECIMAL(10,2) NOT NULL,
  `type_prodotto_idtype_prodotto` INT NOT NULL,
  `market_idmarket` INT NOT NULL,
  `unita_misura_idunita_misura` INT NOT NULL,
  `utente_idutente` INT NOT NULL,
  PRIMARY KEY (`idprodotto`),
  INDEX `fk_prodotto_type_prodotto_idx` (`type_prodotto_idtype_prodotto` ASC) VISIBLE,
  INDEX `fk_prodotto_market1_idx` (`market_idmarket` ASC) VISIBLE,
  INDEX `fk_prodotto_utente1_idx` (`utente_idutente` ASC) VISIBLE,
  INDEX `fk_prodotto_unita_misura1_idx` (`unita_misura_idunita_misura` ASC) VISIBLE,
  CONSTRAINT `fk_prodotto_market1`
    FOREIGN KEY (`market_idmarket`)
    REFERENCES `spesa`.`market` (`idmarket`),
  CONSTRAINT `fk_prodotto_type_prodotto`
    FOREIGN KEY (`type_prodotto_idtype_prodotto`)
    REFERENCES `spesa`.`type_prodotto` (`idtype_prodotto`),
  CONSTRAINT `fk_prodotto_unita_misura1`
    FOREIGN KEY (`unita_misura_idunita_misura`)
    REFERENCES `spesa`.`unita_misura` (`idunita_misura`),
  CONSTRAINT `fk_prodotto_utente1`
    FOREIGN KEY (`utente_idutente`)
    REFERENCES `spesa`.`utente` (`idutente`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spesa`.`ricetta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spesa`.`ricetta` (
  `idricetta` INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idricetta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spesa`.`ricetta_has_prodotto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spesa`.`ricetta_has_prodotto` (
  `ricetta_idricetta` INT NOT NULL,
  `prodotto_idprodotto` INT NOT NULL,
  PRIMARY KEY (`ricetta_idricetta`, `prodotto_idprodotto`),
  INDEX `fk_ricetta_has_prodotto_prodotto1_idx` (`prodotto_idprodotto` ASC) VISIBLE,
  INDEX `fk_ricetta_has_prodotto_ricetta1_idx` (`ricetta_idricetta` ASC) VISIBLE,
  CONSTRAINT `fk_ricetta_has_prodotto_prodotto1`
    FOREIGN KEY (`prodotto_idprodotto`)
    REFERENCES `spesa`.`prodotto` (`idprodotto`),
  CONSTRAINT `fk_ricetta_has_prodotto_ricetta1`
    FOREIGN KEY (`ricetta_idricetta`)
    REFERENCES `spesa`.`ricetta` (`idricetta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `spesa`.`shop_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `spesa`.`shop_list` (
  `prodotto_idprodotto` INT NOT NULL,
  `qnt` DECIMAL(10,2) NULL DEFAULT NULL,
  `utente_idutente` INT NOT NULL,
  INDEX `fk_shop_list_prodotto1_idx` (`prodotto_idprodotto` ASC) VISIBLE,
  INDEX `fk_shop_list_utente1_idx` (`utente_idutente` ASC) VISIBLE,
  CONSTRAINT `fk_shop_list_prodotto1`
    FOREIGN KEY (`prodotto_idprodotto`)
    REFERENCES `spesa`.`prodotto` (`idprodotto`),
  CONSTRAINT `fk_shop_list_utente1`
    FOREIGN KEY (`utente_idutente`)
    REFERENCES `spesa`.`utente` (`idutente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
