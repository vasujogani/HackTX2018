import requests
import speech_analysis
import dict_parser
from bs4 import BeautifulSoup


db = dict_parser.database()
link = ''
link_base = 'https://www.tasteofhome.com/search/index?search='
link_query_conditions = '&st=2&rm=0&vw=1&page=1&rm=2&sort=0'
# recipe_list = ["chicken", "tikka", "masala"]
# recipe_list get from rev ai


# #response = {
# 	"recipes": [
# 		{recipe1},
# 		{recipe2},
#       {recipe3}
# 	]
# #}
def find_recipes(speech_text):
	# assume speech analysis gives tokenized words list
	recipe_list = speech_analysis.analyze_text(speech_text)
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


	metadata = {}
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
		return_body['link'] = str(link)

		id += 1

		recipe_page = requests.get(link)
		recipe_soup = BeautifulSoup(recipe_page.content, 'html.parser')


		title = recipe_soup.find('meta', {"property": "og:title"})
		if title is not None and title["content"] is not None:
			#print(title["content"].get_text())
			print(title["content"])
			recipe_dict["title"] = str(title["content"])
		else:
			recipe_dict["title"] = ""

		img_div = recipe_soup.find('div', {"class": "recipe-image-and-meta-sidebar__featured-container"})
		img_container = img_div.find("img", recursive=False)
		if img_container is not None and img_container["src"] is not None:
			print(img_container["src"])
			recipe_dict["img_src"] = str(img_container["src"])
		else:
			recipe_dict["img_src"] = ""

		ingredients = list()
		for ingredient_list in recipe_soup.find_all('ul', {"class": "recipe-ingredients__list"}):
			for i in ingredient_list.findAll('li'):
				ingredients.append(str(i.get_text()))
		recipe_dict["ingredients"] = ingredients

		# recipe_dict = {
		# 'id': rid
		# 'link': rec link
		# 'title': rec title,
		# 'img src': img src link,
		# 'ingredients': recipe ingredients
		return_list.append(recipe_dict)

	return_body["recipes"] = return_list
	print(return_body)
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
