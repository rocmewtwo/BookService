# BookService

## How to Run

### Prerequisites

1. Install Docker: [Docker Installation Guide](https://docs.docker.com/get-docker/)
2. Install Docker Compose: [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

### Steps to Run

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/BookService.git
   cd BookService
   ```

2. **Build and run the Docker containers**:

   ```sh
   docker-compose up --build
   ```

3. **Access the services**:
   - **Backend (BookService)**: The backend service will be running on `http://localhost:5287`.
   - **Frontend (Client)**: The frontend service will be running on `http://localhost:3000`.

### Additional Commands

- **Stop the services**:

  ```sh
  docker-compose down
  ```

- **Rebuild a specific service**:
  ```sh
  docker-compose build <service_name>
  ```
  Replace `<service_name>` with [`bookservice`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fjimmy%2FBook%2Fbookservice%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2206b4da52-daa7-4830-aaa8-437fbfe99ff5%22%5D "/Users/jimmy/Book/bookservice") or `client`.

### Troubleshooting

- If you encounter any issues, ensure that Docker and Docker Compose are correctly installed and running.
- Check the logs for any errors:

  ```sh
  docker-compose logs
  ```

- Ensure that the `nginx.conf` file and other configuration files are correctly placed and referenced in the Dockerfile.

## How to Login

| Username | Password |
| -------- | -------- |
| admin    | password |
| user     | password |
