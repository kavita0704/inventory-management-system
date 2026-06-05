# Inventory Management System

## Overview

A full-stack Inventory Management System built using React, FastAPI, SQLAlchemy, SQLite, and Docker.

The application allows users to manage products, customers, and orders while maintaining inventory stock levels.

## Features

* Product Management

  * Add products
  * View products
  * SKU validation

* Customer Management

  * Add customers
  * View customers
  * Email validation

* Order Management

  * Create orders
  * Automatic stock deduction
  * Inventory validation

* Dashboard

  * Product overview
  * Customer overview
  * Order overview

## Tech Stack

### Frontend

* React
* Vite
* Bootstrap
* Axios

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

### DevOps

* Docker

## API Endpoints

### Products

* GET /products
* POST /products

### Customers

* GET /customers
* POST /customers

### Orders

* GET /orders
* POST /orders

## Running Backend

cd backend

uvicorn main:app --reload

## Running Frontend

cd frontend

npm install

npm run dev

## Docker

Backend:

docker build -t inventory-backend .

Frontend:

docker build -t inventory-frontend .

## Author

Kavita Saini
IIT Kanpur
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/16887ae6-03e0-4f0d-931e-57fe5b5e2d15" />
