[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

1. initialize the project
   create a folder
   mkdir countries-api & cd countries-api
   npm init -y
   npm i react-router-dom

API Reference
The app uses the REST Countries API v3.1 with the following endpoints:

GET /all – Retrieve list of all countries
GET /name/{name} – Search country by name
GET /region/{region} – Filter countries by region
GET /alpha/{code} – Get detailed info by country code

Usage Instructions

1. Search for any country using the search bar.
2. Filter countries by region using the dropdown.
3. Click on a country card to view full details.
4. Sign up and log in to unlock the favorites page.

Challenge faced
Authentication Without Backend
Since backend integration was out of scope, user sign-up/login was implemented using localStorage, simulating a basic authentication flow while maintaining security considerations.
