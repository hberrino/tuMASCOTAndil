package com.buscatumascotandil.find;

import com.buscatumascotandil.find.config.EnvironmentValidator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TumascotandilApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(TumascotandilApplication.class);
		app.addListeners(new EnvironmentValidator());
		app.run(args);
	}

}
