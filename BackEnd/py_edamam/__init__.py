import requests
import json


class Edaman(object):
    def __init__(self, nutrition_appid=None, nutrition_appkey=None,
                 recipes_appid=None, recipes_appkey=None):
        self.nutrition_appid = nutrition_appid
        self.nutrition_appkey = nutrition_appkey
        self.recipes_appid = recipes_appid
        self.recipes_appkey = recipes_appkey

    def search_recipe(self, query="chicken"):
        url = 'https://api.edamam.com/search?q=' + query + '&app_id=' + \
              self.recipes_appid + '&app_key=' + \
              self.recipes_appkey

        r = requests.get(url)
        hits = r.json()["hits"]

        recipes = {}
        for hit in hits:
            recipe = hit["recipe"]
            name = recipe["label"]
            recipes[name] = {}
            recipes[name]["nutrients"] = recipe["totalNutrients"]
            recipes[name]["cautions"] = recipe["cautions"]
            recipes[name]["health_labels"] = recipe["healthLabels"]
            recipes[name]["diet_labels"] = recipe["dietLabels"]
            recipes[name]["calories"] = recipe["calories"]
            recipes[name]["ingredients"] = recipe["ingredientLines"]
            recipes[name]["url"] = recipe["url"]
        return recipes