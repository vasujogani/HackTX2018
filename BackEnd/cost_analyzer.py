import requests
from bs4 import BeautifulSoup

def analyze_cost(missing_items):
	item_costs = dict(list([
		  ['milk', 0.20],
          ['bread', 0.67],
          ['rice', 0.32],
          ['eggs', 0.58],
          ['cheese', 0.95],
          ['chicken', 1.38],
          ['beef', 1.85],
          ['apples', 1.45],
          ['banana', 0.28],
          ['oranges', 1.73],
          ['tomato', 0.67],
          ['potato', 0.53],
          ['onion', 0.21],
          ['lettuce', 0.26],
          ['flour', 0.47]
          ['spaghetti', 0.80]
          ['macaroni', 0.80]
          ['pork', 1.80],
          ['bacon', 0.25],
          ['butter', 0.25],
          ['grapefruit', 1.42],
          ['grapes', 1.12],
          ['lemon', 0.42],
          ['peach', 1.60],
          ['strawberries', 1.17],
          ['broccoli', 0.85],
          ['sugar', 0.12],
          ]))

	cost = 0.0

	for missing_item in missing_items:
		if item_costs.get(missing_item, None) is not None:
			cost += item_costs[missing_item]
		else:
			for key in item_costs:
				if key in missing_item.lower():
					cost += item_costs[key]
					break

	return cost






