package main

import (
	"backend/handlers"
	"backend/utils"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
    app := fiber.New()

    // Enable CORS
    app.Use(cors.New(cors.Config{
        AllowOrigins: "http://localhost:5173", // Adjust this to your frontend's URL
        AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
    }))
    
    // Load adventure data
    utils.LoadAdventureData()

    // Define routes
    app.Get("/node/:id", handlers.GetNode)

    log.Fatal(app.Listen(":3000"))
}
