const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options ={
    "components": {
        "schemas": {
            User : m2s(User),
            Product : m2s(Product)
          }
    },
    "openapi": "3.1.0",
    "info":{
        "version": "1.0.0",
        "title": "Products CRUD API",           
        "description": "Products Project Application",
    },
    "contact": {
        "name": "API Support",
        "url": "https://www.example.com",
        "email": "support@example.com"
    },
    "servers" : [
        {
            url: 'http://localhost:3000',
            description: 'Local Server'
        },
        {
            url: "http://www.example.com",
            description: "Testing Server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description" : "API for users"
        },
        {
            "name": "Products",
            "description": "API for products"
        },
        {
            "name": "Users and Products",
            "description" :"API for users and their products"
        }
    ],
    "paths": {
        "/api/users":{
            "get":{
                "tags": [
                    "Users"
                ],
                "summary": "Get all users",
                "responses": {
                    "200": {
                        "description": "OK" ,
                        "content":{
                        "schema": {
                            "$ref":"#/components/schemas/User"
                              }
                         }
                }
            }
        }
    },
    "post":{
        "tags" : [
            "Users"
        ],
        "description" : "Create new user",
        "requestBody": {
            "description":"User that we want to create",
            "content":{
                "application/json":{
                    "schema": {
                        "type": "object",
                        "properties": {
                            "username" : {"type" : "string"},
                            "password" : {"type" : "string"},
                            "name" :     {"type": "string"},
                            "surename": {"type" : "string"},

                        }
                    }
                }
            }
        }
    },
        "api/users/{username}" :{
            "get": {
                "tags":[
                    "Users"
                ],
                "parameters" : [
                    {
                        "name" :"username",
                        "in" : "path",
                        "required": true,
                        "description": "Username of user",
                        "type" : "string"
                    }
                ],
                "summary" : "Get one user",
                "responses" : {
                    "200": {
                        "description" : "OK",
                        "content":{
                        "schema" : {
                            "$ref": "#components/schemas/User"
                        }
                    }
                }
            }
        }
    },
        "/api/user-products":{
        "get": {
            "tags": [
                "Users and Products"
            ],
            "summary": "Get all user's product",  
            "responses": {
                "200": {
                    "description": "OK",
                    "schema": {
                        "$ref":"#/components/schemas/User"
                    }
                }

             }
        },
        "post" : {
            "tags" : [
                "Users and Products"
            ],
            "description": "Add a new product for user",
            "requestBody" : {
                "description": "User that we want to add the product",
                "content" : {
                    "application/json":{
                        "schema": {
                            "type": "object",
                            "properties":{
                                "username": {"types": "string"},
                                "products" : {
                                    "type" :"array",
                                    "items": {
                                        "type": "objects",
                                        "properties" : {
                                            "product" : {"type": "string"},
                                            "cost" : {"type":"number"},
                                            "quantity" : {"type":"number"}
                                    }
                                }
                            }
                        },
                        "required" : ["quantity"]
                    }
                }
            }
        },
        "responses" : {
            "200" : {
                "description" : "New prodcuctt add"
            }
        }
    }
 }  
 
}
}