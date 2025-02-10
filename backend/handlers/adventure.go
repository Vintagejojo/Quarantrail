package handlers

import (
	"backend/models"
	"log"

	"github.com/gofiber/fiber/v2"
)

func GetNode(c *fiber.Ctx) error {
    id := c.Params("id")

    node, exists := models.AdventureMap[id]
    if !exists {
        return c.Status(404).JSON(fiber.Map{"error": "Node not found"})
    }

    log.Printf("Serving node: %+v", node) // Debugging log
    return c.JSON(node)
}




//  This directory contains your handler functions. 
//  For example, adventure dot geaux will handle requests related to your adventure
//   such as fetching text and processing user choices