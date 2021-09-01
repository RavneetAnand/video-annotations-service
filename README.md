# Books service

============================

Books microservice runs on Port number - 3000

## Books

Books supports the following operations :

- ### getBooksList
#### Description : Get the books list from the database. This method is called from the API route "/service/getBooks".

- ### Database configuration
#### It can be set in the file server.js.
#### Scripts to create the tables required for the service can be found at the path     "\books-service\src\utils\db_scripts".
#### Please run them after on the database before starting the service.

- ### API
#### URLs to fetch data are defined in the file api/routes.js