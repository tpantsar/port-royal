## Install OpenJDK and Apache Maven

https://developers.redhat.com/products/openjdk/download

https://maven.apache.org/download.cgi

## Run the backend application from terminal

1. Navigate to the root directory of your Spring Boot application where the <strong>pom.xml</strong> file is located.<br>
2. Use the following Maven command to run the application:<br>
   `mvn spring-boot:run`

## Build and run the backend application

`mvn clean spring-boot:run`

Alternatively, if you have already built the application and have a JAR file, you can run it using the java -jar command:

1. Build the application using Maven:<br>
2. Run the generated JAR file:<br>
   `java -jar target/your-application-name.jar`

Replace your-application-name.jar with the actual name of the JAR file generated in the target directory.
