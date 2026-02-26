package com.donemiliano.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
        .info(new Info()
            .title("Don Emiliano API")
            .version("1.0.0")
            .description("API documentation for Don Emiliano Platform")
            .contact(new Contact()
                .name("Don Emiliano Team")
                .email("support@donemiliano.com"))
            .license(new License()
                .name("Apache 2.0")
                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
        .servers(List.of(
            new Server()
                .url("http://localhost:8080")
                .description("Development server"),
            new Server()
                .url("https://api.donemiliano.com")
                .description("Production server")));
  }

}
