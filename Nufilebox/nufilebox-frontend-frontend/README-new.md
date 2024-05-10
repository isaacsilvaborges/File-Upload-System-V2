# NuFileBox Frontend
Official frontend repository of the NuFileBox project, a partnership between NuBank and UFCG (NuFuturo)

## Introduction
NuFileBox is a single-file-transferring secure service.

## Tools and technologies used in the implementation

- JavaScript
- Node.js
- React

## Dependencies Needed

- Run with Node.js
    - Node.js 

- Run with Docker
    - Docker

## How to run this application

In order to run this application, take the following steps:

1. Clone this repository in your machine:
    
    ```
    git@github.com:nufuturo-ufcg/nufilebox-frontend.git
    ```
    
2. Open a terminal and navigate to the root of this project

3. Create a copy of the `.env-example` file in the same directory as this file named `.env` and add appropriate values to the variables

### Run with Node.js

4. Install the dependencies by running the following command:

   ```
   npm install
   ```

5. Start the application by running the following command:

   ```
   npm start
   ```

### Run with Docker

4. Execute the following command to build the image and run the application:
    
    ```
    docker compose up --build -d
    ```

The application will be up and running in the link `http://localhost:3000`.

## Notes

In the download, the `FileSystemWritableFileStream` interface is used for writing files to the disk in stream mode. To access it, it is necessary to use the functions `showSaveFilePicker()` from the Window interface and `createWritable()` from the FileSystemFileHandle interface, respectively, which have limitations regarding browser support. 

Therefore, check if your browser supports the mentioned functions and interface before testing in the following links:
[FileSystemWritableFileStream](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream), 
[showSaveFilePicker()](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker), 
[createWritable()](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle/createWritable).
