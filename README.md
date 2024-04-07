# Video annotations service

============================

This repository contains the backend code for a video service API. The service allows for authenticating users, managing video content, and handling annotations for each video.

## Prerequisites

To install the application, you will need the following:

Node.js and npm:
You can install the latest version of npm globally by running the command `npm install npm@latest -g`.
You can install Node.js using nvm (Node Version Manager) by running `nvm install v20`.

## Getting Started

### Using Docker

If you prefer to use Docker to run the service, you can containerize the application using a Dockerfile. Ensure Docker is installed on your machine and build the image using the following command:

```bash

docker build -t videoannotationsservice .

```

Then, you can run the container:

```bash

docker run -p 8000:8000 videoannotationsservice
This command will build the Docker image with the tag videoannotationsservice and run it, exposing the service on port 8000.

```

### Running locally

To run this project locally, you need to have Node.js and npm installed. Clone the repository, install the dependencies, and start the server.

```bash
git clone https://github.com/RavneetAnand/video-annotations-service.git
cd <repository-directory>
npm install
npm run build
npm start

```

## API Routes

The following routes are available in the API:

### Authentication

`POST /authenticate`: Authenticate a user. This route is used to log in users into the system by providing them a jwt token.

For test purpose, you can access the API route with this object in the body:

```json
{ "username": "test", "password": "test" }
```

### Videos

`GET /videos`: Retrieve all videos. This endpoint allows fetching a list of all available video metadata in the system.
`POST /videos`: Create a new video entry. Use this route to add new video metadata to the system. This route can accept these properties in the body:
`{
    videoId: string;
    title: string;
    description: string;
    url: string;
    duration: number;
}`

`DELETE /videos/:videoId`: Delete a specific video by ID. This route allows removing a video from the system based on its unique identifier.

### Annotations

`GET /annotations/:videoId`: Get all annotations for a specific video by the video ID. This endpoint fetches annotations related to a given video.
`POST /annotations`: Create annotations for a video. This route is used to add new annotations to a video. This route can accept these properties in the body:
`{
    videoId: string;
    annotationTypeId: number;
    startTime: number;
    endTime: number;
    notes: string;
}`

`PUT /annotations`: Update video annotations. This endpoint allows modifying existing annotations. This route can accept these properties in the body:
`{
    annotationId: number;
    videoId: number;
    annotationTypeId: number;
    startTime: number;
    endTime: number;
    notes: string;
}`

`DELETE /annotations/:annotationId`: Delete a specific annotation by ID. Use this route to remove an annotation from a video.

## Usage

To interact with the API, you can use any HTTP client like curl, Postman, or write client-side code using frameworks/libraries like Axios, Fetch API, etc.

Example of authenticating a user using curl:

```bash

curl -X POST http://localhost:8000/authenticate -d '{"username":"test", "password":"test"}' -H "Content-Type: application/json"

```

This will provide you with a jwt token. That you will have to include in all the remaining request headers in order for them to work.

## Assumptions & Future Improvements

1. No two annotations for a video might have same start-time and end-time. As a part of improvement, we can add this check before update or inserting a new annotation.
2. Improve error-handling. For now, its very basic.
3. Add more unit tests and API tests for all the API route handlers.
4. Using a hard-coded secret-key for now. This can be saved securely as an environment variable
5. Using hard-coded inline queries, these can be saved securely in a separate file for the sake of reusibility.
