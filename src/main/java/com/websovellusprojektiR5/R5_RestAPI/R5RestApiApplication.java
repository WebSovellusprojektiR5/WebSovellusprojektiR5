package com.websovellusprojektiR5.R5_RestAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication (exclude = {SecurityAutoConfiguration.class})
public class R5RestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(R5RestApiApplication.class, args);
	}

}
