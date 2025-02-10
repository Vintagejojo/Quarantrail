package utils

import (
	"backend/models"
	"encoding/json"
	"log"
	"os"
)

func LoadAdventureData() {
    data, err := os.ReadFile("adventure.json")
    if err != nil {
        log.Fatalf("Failed to read adventure data: %v", err)
    }

    // Initialize the map before unmarshaling
    models.AdventureMap = make(map[string]models.AdventureNode)

    err = json.Unmarshal(data, &models.AdventureMap)
    if err != nil {
        log.Fatalf("Failed to parse adventure data: %v", err)
    }

    // Log the loaded data to confirm everything is working
    log.Printf("Adventure Data Loaded: %+v", models.AdventureMap)
}




// This directory contains utility functions. For example, load_data.go will 
// include functions for loading and parsing
//  the JSON data.