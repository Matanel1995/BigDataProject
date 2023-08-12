# Exploring Bright Stars, Meteors, and the Sun with Advanced Data Technologies

Welcome to our project! Here's a brief overview of our endeavor to study and analyze various celestial phenomena, including bright stars, meteors, and the Sun, using advanced data technologies and tools.

## Overview

In this project, our team has built a powerful platform that leverages modern technologies to process and explore celestial data. We employ a robust architecture and cutting-edge components to achieve efficient data handling and visualization. Our platform focuses on real-time data processing, data visualization, and scalability to offer researchers and enthusiasts valuable insights into the wonders of the universe.

## Components

### 1. Simulator

The Simulator plays a critical role in our platform. It generates simulated data related to bright stars, meteors, and other celestial events. This data is then sent as messages to Apache Kafka for further processing and analysis.

### 2. Apache Kafka

Kafka acts as a high-throughput, distributed messaging system, serving as the central hub for data communication in our platform. The Simulator sends data messages to Kafka, which are then consumed by various components, including the data processing module responsible for storing the data in Elastic Search.

### 3. Elastic Search

Elastic Search serves as our primary data store. It efficiently indexes and stores the data received from Kafka. As data continuously streams into Elastic Search, it becomes easily searchable and accessible for querying and creating insightful visualizations.

### 4. Node.js & React

The codebase for our platform is developed using Node.js and React. Node.js' non-blocking and event-driven architecture enable efficient handling of incoming data from Kafka and other sources. React provides a flexible and user-friendly front-end framework for creating interactive and dynamic dashboards.

### 5. Web Scraping

To enhance our data analysis, we gather additional information about the Sun using web scraping techniques. This data is then integrated into the dashboard, providing comprehensive insights into the Sun's behavior and characteristics.

### 6. Docker

Docker is utilized to containerize the Redis data store. Containerizing Redis ensures easy deployment, scalability, and consistent behavior across various environments.

### 7. Redis

Redis serves as an in-memory data store, enabling us to cache frequently accessed data and speed up retrieval operations. Storing Redis in a Docker container simplifies its management and deployment.

## Workflow

Our platform's workflow revolves around the Simulator generating data, which is then sent to Kafka for further processing. The data is ingested by Elastic Search, enabling fast and flexible querying. The insights obtained are visualized using React-based dashboards, empowering users to explore and analyze the behavior of bright stars, meteors, and the Sun. Additionally, we enrich our analysis by incorporating web-scraped data related to the Sun.

## Conclusion

In conclusion, our project offers an innovative and scalable approach to studying celestial phenomena. With a strong emphasis on real-time data processing, data visualization, and leveraging modern technologies like Kafka, Elastic Search, Docker, Node.js, React, and web scraping, our platform enables researchers and enthusiasts to gain valuable insights into the wonders of the universe.

Thank you for your interest in our project! Feel free to explore the repository and share your feedback and contributions. Together, we can continue expanding our knowledge of the cosmos.






# Project Configuration Guide

To configure the project successfully, follow these steps:

## Server Configuration

Before running the client server, ensure that all the necessary backend servers are up and running. Open separate terminals for each of the following directories and start their respective server scripts:

1. In the Webscraping directory, run 'node sun.js' to initiate the web scraping process, gathering additional data related to the Sun.
2. In the ElasticSearch directory, run 'node es.js' to start consuming messages from Kafka.
3. In the Kafka directory, run 'node index.js' to start consuming the messages sent by the Simulator and process them accordingly.
4. In the Simulator directory, run 'node index.js' to generate simulated data and send it as messages to Kafka.
5. In the NasaConsumer directory, run 'node index.js' to consume data from NASA (if applicable) and process it for further analysis.

## Client Server Activation

Finally, navigate to the client directory and run 'npm start' to launch the client server. This will start the React-based frontend application, allowing users to access the dashboards and explore the insights generated from the data collected and processed by the backend components.

By following these steps and configuring each component as instructed, you will have a fully operational platform to study and analyze bright stars, meteors, and the Sun using advanced data technologies. The seamless integration of Kafka, Redis, Elastic Search, Node.js, React, and web scraping ensures an efficient, real-time, and interactive experience for researchers and enthusiasts alike.

## DashBoard
![DashBoard](https://github.com/Matanel1995/BigDataProject/assets/92520981/2fae0494-19b7-4468-a02b-d329d9945582)
### Also in light mode (available for the whole dashboard)
![DashBoardLightMode](https://github.com/Matanel1995/BigDataProject/assets/92520981/4c08692d-abc2-49f9-b4e1-f38660e89f49)

## Search
![SearchPage](https://github.com/Matanel1995/BigDataProject/assets/92520981/fc9efcd6-385c-45bb-a7c0-8ce87e7536ce)

## Other pages
![LastDayEvent](https://github.com/Matanel1995/BigDataProject/assets/92520981/7b07c6ac-4b12-4d6f-b836-77b87d4a3773)
![SunDetails](https://github.com/Matanel1995/BigDataProject/assets/92520981/160045ff-5847-4f62-9f25-8376d608f565)
