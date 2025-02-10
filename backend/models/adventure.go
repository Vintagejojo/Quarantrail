package models

type Option struct {
	ID     string `json:"id"`
	Choice string `json:"choice"`
	Health int    `json:"health"`
	Sanity int    `json:"sanity"`
}

type AdventureNode struct {
	Text    string   `json:"text"`
	Options []Option `json:"options"`
}

var AdventureMap map[string]AdventureNode

// This directory contains your data models. For example,
// adventure dot geaux will define the
// structs for AdventureNode and Option.