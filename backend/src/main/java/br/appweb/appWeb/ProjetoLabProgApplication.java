package br.appweb.appWeb;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjetoLabProgApplication { // Classe principal que inicia a aplicação

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load(); // Carrega as variáveis de ambiente
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue())); // Define as variáveis
																									// de ambiente
		SpringApplication.run(ProjetoLabProgApplication.class, args); // Inicia a aplicação
	}

}
