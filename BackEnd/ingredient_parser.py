import requests
import speech_analysis
import database
from bs4 import BeautifulSoup
import re
import FindReceipes as find_rec
from difflib import SequenceMatcher

db = database.database()
link = ''
link_base = 'https://www.tasteofhome.com/search/index?search='
link_query_conditions = '&st=2&rm=0&vw=1&page=1&rm=2&sort=0'
exists = []
# recipe_list = ["chicken", "tikka", "masala"]
# recipe_list get from rev ai


# #response = {
# 	"recipes": [
# 		{recipe1},
# 		{recipe2},
#       {recipe3}
# 	],
#
#   "current_ingredients": [
#       {curr recipe1},
#       {curr recipe2},
#       {curr recipe3},
#   ]
#
#       {curr recipe1},
#       {curr recipe1},
#       {curr recipe1},
#
#
#
# #}

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

def findMatchHelper(a, b):
    if similar(a, b) > 0.9:
    	return True

    for w in a.split(" "):
    	if w in b:
    		return True
			
	for w in b.split(" "):
    	if w in a:
    		return True

	return False

def findMatch(a):
    for s in pantry:
    	if findMatchHelper(s, a):
    		return True
	return False

def cleanIngredient(ing):
    ing = ''.join([i for i in ing if not i.isdigit()])
    words_remove = {
        'oz':1,
        'ounce':1,
        'ounces':1,
        'teaspoon':1,
        'teaspoons':1,
        'tablespoon':1,
        'tablespoons':1,
        'cup':1,
        'cups':1,
        'pint':1,
        'pints':1,
        'cooked':1,
        'inch':1,
        'pound':1,
        'pounds':1,
        'lb':1,
        'jar':1,
        'jars':1,
        'package':1,
        'packages':1,
        'lbs':1,
        'g':1,
        'can':1,
        'tbsp':1,
        'c':1,
        'pkg':1,
        'each':1,
        'fl':1,
        'Tbs':1,
        'tsp':1,
        'ml':1,
    }
    ing = re.sub(r'[^a-zA-Z ]+', '', ing)
    r = ''
    for w in ing.split(' '):
        if w not in words_remove:
            r += w + ' '
    ing = r

    return ing.strip()


def find_recipes(speech_text):
	# assume speech analysis gives tokenized words list
	recipe_list = speech_analysis.analyze_text(speech_text)
	return get_recipe_info(recipe_list)


def get_recipe_info(recipe_list):
	recipe_string = "+".join(recipe_list)
	full_link = link_base + recipe_string + link_query_conditions

	page = requests.get(full_link)

	soup = BeautifulSoup(page.content, 'html.parser')
	recipes = filter(lambda link: link['href'] is not None and
	                              link['href'].startswith('https://www.tasteofhome.com/recipes/') and
	                              link['href'].endswith('/'),
	                 soup.find_all('a', href = True))

	recipes_links = set()
	for r in recipes:
		recipes_links.add(r['href'])

	# this is the wrapper around the whole return
	return_body = {}
	return_list = []
	id = 1
	for link in recipes_links:
		# only give max 3 recipes
		if(id > 3):
			break
		# recipe dict has all the data for the recipes
		recipe_dict = {}

		recipe_dict['id'] = id
		recipe_dict['link'] = str(link)

		id += 1

		recipe_page = requests.get(link)
		recipe_soup = BeautifulSoup(recipe_page.content, 'html.parser')

		title = recipe_soup.find('meta', {"property": "og:title"})
		if title is not None and title["content"] is not None:
			recipe_dict["title"] = str(title["content"])
		else:
			recipe_dict["title"] = ""

		img_div = recipe_soup.find('div', {"class": "recipe-image-and-meta-sidebar__featured-container"})
		img_container = None
		if img_div is not None:
			img_container = img_div.find("img", recursive=False)
		if img_container is not None and img_container["src"] is not None:
			recipe_dict["img_src"] = str(img_container["src"])
		else:
			recipe_dict["img_src"] = ""

		ingredients = list()
		cost = 0
		for ingredient_list in recipe_soup.find_all('ul', {"class": "recipe-ingredients__list"}):
			for i in ingredient_list.findAll('li'):
				ing = cleanIngredient(str(i.get_text()))
				if findMatch(ing):
    				ingredients.append({'name': ing, 'available': True})
				else:
					ingredients.append({'name': ing, 'available': False})
					cost += find_rec.findPrice(ing)

		# ingredients is cleaned
		print(ingredients)
		recipe_dict["ingredients"] = ingredients
		recipe_dict["missing_cost"] = cost
		

		# recipe_dict = {
		# 'id': rid
		# 'link': rec link
		# 'title': rec title,
		# 'img src': img src link,
		# 'ingredients': list recipe ingredients
		return_list.append(recipe_dict)

	return_body["recipes"] = return_list
	return return_body


find_recipes("chicken parmesan")


	# for ingred in recipe_dict.values():
	# 	ing = ingred[2]
	# 	# print("this is the analyzed key words\n\n")
	# 	for anal_text in speech_analysis.analyze_text(str(ing)):
	# 		# list the stripped analyzed data
	# 		#stripped is what we want to display to user
	# 		stripped = ""
	# 		for token in anal_text.lower().split():
	# 			# print(token)
	# 			doc_ref = db.collection('common_ingredients').document(token)
	# 			doc = doc_ref.get()
	# 			if doc.to_dict() is not None:
	# 				stripped += (str(doc_ref.id) + " ")
	# 	# print(anal_text + " what it should be " + stripped)
