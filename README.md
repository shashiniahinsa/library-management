# Library Management System (LibMgmt109)

A comprehensive Spring Boot REST API for managing library operations including books, members, staff, and lending transactions.

## Project Overview

LibMgmt109 is a classroom project developed for CMJD109, designed to demonstrate enterprise-level Java development with Spring Boot. It provides a complete backend solution for a library management system with JWT-based security, JPA data persistence, and RESTful API endpoints.

## Features

### Core Functionality
- **📚 Book Management**: Add, update, delete, and retrieve book information
- **👥 Member Management**: Register members, manage member profiles and lending history
- **👔 Staff Management**: Manage library staff with secure authentication
- **📤 Lending System**: Track book lending and returns with member-book associations
- **🔒 Security**: JWT-based authentication and role-based access control

### Technical Highlights
- Spring Boot 3.4.1 with Spring Data JPA
- JWT (JSON Web Token) authentication
- CORS configuration for cross-origin requests
- Custom exception handling
- ModelMapper for DTO conversion
- Lombok for reducing boilerplate code
- RESTful API with standardized endpoints
- Multi-profile configuration (dev, live)

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 21 | Programming Language |
| Spring Boot | 3.4.1 | Framework |
| Spring Data JPA | Latest | Data Persistence |
| Spring Security | Latest | Authentication & Authorization |
| ModelMapper | Latest | DTO Conversion |
| Lombok | 1.18.36 | Code Generation |
| MySQL | Latest | Database |
| Maven | Latest | Build Tool |

## Project Structure

```
LibMgmt109/
├── src/
│   ├── main/
│   │   ├── java/lk/ijse/cmjd109/LibMgmt109/
│   │   │   ├── controller/           # REST API endpoints
│   │   │   ├── service/              # Business logic layer
│   │   │   ├── dao/                  # Data Access Objects / Repositories
│   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── entities/             # JPA Entity classes
│   │   │   ├── exception/            # Custom Exception classes
│   │   │   ├── secureConfig/         # Security configuration
│   │   │   └── util/                 # Utility classes
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       └── application-live.properties
│   └── test/                         # Unit tests
├── pom.xml                           # Maven configuration
└── README.md                         # This file
```

## API Endpoints

### Books
```
POST   /libmgmt/api/v1/books              - Create a new book
GET    /libmgmt/api/v1/books              - Retrieve all books
GET    /libmgmt/api/v1/books/{bookId}     - Get book by ID
PUT    /libmgmt/api/v1/books/{bookId}     - Update book information
DELETE /libmgmt/api/v1/books/{bookId}     - Delete a book
```

### Members
```
POST   /libmgmt/api/v1/members            - Register a new member
GET    /libmgmt/api/v1/members            - Get all members
GET    /libmgmt/api/v1/members/{memberId} - Get member details
PUT    /libmgmt/api/v1/members/{memberId} - Update member information
DELETE /libmgmt/api/v1/members/{memberId} - Delete member
```

### Staff
```
POST   /libmgmt/api/v1/staff              - Add staff member
GET    /libmgmt/api/v1/staff              - Get all staff
GET    /libmgmt/api/v1/staff/{staffId}    - Get staff details
PUT    /libmgmt/api/v1/staff/{staffId}    - Update staff information
DELETE /libmgmt/api/v1/staff/{staffId}    - Delete staff member
```

### Lending
```
POST   /libmgmt/api/v1/lending            - Create lending record
GET    /libmgmt/api/v1/lending            - Get all lending records
GET    /libmgmt/api/v1/lending/{lendingId} - Get lending details
PUT    /libmgmt/api/v1/lending/{lendingId} - Update lending record
DELETE /libmgmt/api/v1/lending/{lendingId} - Delete lending record
```

## Getting Started

### Prerequisites
- Java 21 or higher
- Maven 3.6+
- MySQL Server 8.0+

### Installation

1. **Clone or download the project**
   ```bash
   cd LibMgmt109
   ```

2. **Configure the database**
   
   Update `src/main/resources/application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/libmgmt_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

   Or using Java directly:
   ```bash
   java -jar target/LibMgmt109-0.0.1-SNAPSHOT.jar
   ```

The application will start on `http://localhost:8080/libmgmt`

### Configuration Profiles

The project supports multiple environment profiles:

- **Development** (default): `application-dev.properties`
- **Live/Production**: `application-live.properties`

Switch profiles by updating `spring.profiles.active` in `application.properties`:
```properties
spring.profiles.active=dev    # for development
spring.profiles.active=live   # for production
```

## Security

### Authentication & Authorization

The application implements JWT (JSON Web Token) based authentication:

- **AuthFilter**: Validates JWT tokens for incoming requests
- **AuthEntryPoint**: Handles authentication errors
- **JWTUtils**: Generates and validates JWT tokens
- **UserDetailServiceIMPL**: Custom user details service implementation
- **WebSecurityConfig**: Main security configuration

### Protected Endpoints

Certain endpoints require valid JWT tokens in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

### CORS Configuration

The application is configured to allow cross-origin requests. CORS settings can be modified in `CORSConfig.java`.

## Project Components

### Controllers
- **BookController**: REST endpoints for book operations
- **MembersController**: REST endpoints for member management
- **StaffController**: REST endpoints for staff management
- **LendingController**: REST endpoints for lending operations
- **HealthTestController**: Service health check endpoint

### Services
- **BookService**: Business logic for book management
- **MemberService**: Business logic for member operations
- **StaffService**: Business logic for staff management
- **LendingService**: Business logic for lending transactions

### Data Access
- **BookDao**: Database operations for books
- **MemberDao**: Database operations for members
- **StaffDao**: Database operations for staff
- **LendingDao**: Database operations for lending records

### DTOs (Data Transfer Objects)
- **BookDTO**: Book data transfer object
- **MemberDTO**: Member data transfer object
- **StaffDTO**: Staff data transfer object
- **LendingDTO**: Lending data transfer object

### Entities
- **BookEntity**: JPA entity for books
- **MemberEntity**: JPA entity for members
- **StaffEntity**: JPA entity for staff
- **LendingEntity**: JPA entity for lending records
- **UserEntity**: JPA entity for user authentication

### Exception Handling
- **BookNotFoundException**: Thrown when a book is not found
- **MemberNotFoundException**: Thrown when a member is not found
- **StaffNotFoundException**: Thrown when a staff member is not found
- **LendingNotFoundException**: Thrown when a lending record is not found
- **EnoughBooksNotFoundException**: Thrown when insufficient books are available

## Usage Examples

### Add a Book
```bash
curl -X POST http://localhost:8080/libmgmt/api/v1/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spring Boot in Action",
    "author": "Craig Walls",
    "isbn": "978-1617292545",
    "quantity": 5
  }'
```

### Register a Member
```bash
curl -X POST http://localhost:8080/libmgmt/api/v1/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0771234567",
    "address": "123 Main Street"
  }'
```

### Lend a Book
```bash
curl -X POST http://localhost:8080/libmgmt/api/v1/lending \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "memberId": "M001",
    "bookId": "B001",
    "lendDate": "2024-01-03"
  }'
```

## Database Schema

The application uses JPA with Hibernate for ORM. Key entities include:

### Books Table
```
book_id (PK)
title
author
isbn
quantity
available_quantity
```

### Members Table
```
member_id (PK)
name
email
phone
address
membership_date
```

### Staff Table
```
staff_id (PK)
name
email
phone
position
```

### Lending Table
```
lending_id (PK)
member_id (FK)
book_id (FK)
lend_date
return_date
fine_amount
```

## Development Guidelines

### Code Organization
- Keep business logic in service layer
- Use DTOs for data transfer between layers
- Implement proper exception handling
- Follow Spring conventions and best practices

### Testing
Run unit tests using:
```bash
mvn test
```

### Building
Create a production-ready JAR:
```bash
mvn clean package
```

## Contributing

When contributing to this project:

1. Follow the existing code structure
2. Implement proper exception handling
3. Add appropriate logging
4. Write unit tests for new features
5. Use meaningful variable and method names

## Version Information

- **Project Version**: 0.0.1-SNAPSHOT
- **Spring Boot Version**: 3.4.1
- **Java Version**: 21
- **Maven Version**: Latest

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in properties files
- Ensure the database exists and is accessible

### Port Already in Use
- Change the server port in `application.properties`:
  ```properties
  server.port=8081
  ```

### JWT Token Errors
- Ensure token is sent in Authorization header
- Check token expiry and validity
- Verify secret key configuration

## Future Enhancements

Potential features for future versions:
- Book reservations system
- Fine calculation and payment tracking
- Advanced search and filtering
- Email notifications for due dates
- Analytics and reporting dashboard
- Integration with external book databases

## License

This is an educational project for classroom use. [Add your license information here if applicable]

## Contact & Support

For questions or support regarding this project, please contact:
- **Instructor**: [Contact Information]
- **Institution**: IJSE - Institute of Software Engineering
- **Course**: CMJD109

## Acknowledgments

- Spring Boot documentation and community
- IJSE for the project requirements and guidance
- Contributors to the open-source libraries used

---

**Last Updated**: January 3, 2026  
**Project Status**: Development/Active  
**Developed For**: CMJD109 Classroom Project
