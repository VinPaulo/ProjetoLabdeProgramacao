package br.appweb.appWeb.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;

@Component
public class DatabaseLogger {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseLogger.class);
    private final DataSource dataSource;

    public DatabaseLogger(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            logger.info("================================================================");
            logger.info("Conexao com o banco de dados estabelecida com sucesso!");
            logger.info("Banco de dados: {} {}", metaData.getDatabaseProductName(),
                    metaData.getDatabaseProductVersion());
            logger.info("Driver: {}", metaData.getDriverName());
            logger.info("URL: {}", metaData.getURL());
            logger.info("================================================================");
        } catch (Exception e) {
            logger.error("Falha ao obter metadados do banco de dados: {}", e.getMessage());
        }
    }

    @EventListener(ContextClosedEvent.class)
    public void onContextClosed() {
        logger.info("================================================================");
        logger.info("Conexao com o banco de dados encerrada/suspensa.");
        logger.info("Aplicacao sendo finalizada.");
        logger.info("================================================================");
    }
}
