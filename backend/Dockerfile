# Etapa 1: Compilar
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar archivos de Maven
COPY pom.xml .
COPY src ./src

# Compilar la aplicación
RUN mvn clean package -DskipTests

# Etapa 2: Ejecutar
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copiar el JAR compilado desde la etapa de build
COPY --from=build /app/target/find-0.0.1-SNAPSHOT.jar app.jar

# Crear directorio para uploads
RUN mkdir -p /app/uploads

# Exponer el puerto 8080
EXPOSE 8080

# Variables de entorno deben configurarse en docker-compose o en Render
# NO hardcodeamos credenciales aquí por seguridad
ENV SPRING_PROFILES_ACTIVE=prod

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
