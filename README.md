# _**IMAGE PROCESSING API**_

This is a simple API server using ExpressJS with TypeScripts to build an Image Processing app.

## **1. Installations:**

First you need to install all the required package:

```
npm install
```

Then you would start the server with:

```
npm run start
```

The server will be running on your [local machine](http://localhost:8080/api/images/health-check) on port 8080.

## **2. Endpoint:**

- **Basic route:** [http://localhost:8080](http://localhost:8080).
- **Image processing route:** [http://localhost:8080/api/images](http://localhost:8080/api/images).

  Expected query arguments include:

  - _imageName_ - Already available image names are:

    - a-likely-story
    - richard-gere

  - width: numerical pixel value > 0
  - height: numerical pixel value > 0

- **Image processing health check route:** [http://localhost:8080/api/images/health-check](http://localhost:8080/api/images/health-check).

## **Notes**

You can add more images into the [public/assets/images/full](public/assets/images/full) folder.
