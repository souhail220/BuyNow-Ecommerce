package com.buynow.productservice;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class ProductServiceApplication {

    public static void main(String[] args) {

        // Load the .env file
        Dotenv dotenv = Dotenv.configure()
                .directory("./") // Specify the path to your .env file if not in root
                .ignoreIfMissing() // Ignore if the .env file is missing
                .load();

        // Set environment variables from the .env file
        dotenv.entries().forEach(entry ->
                System.setProperty(entry.getKey(), entry.getValue())
        );

        SpringApplication.run(ProductServiceApplication.class, args);
    }

}
