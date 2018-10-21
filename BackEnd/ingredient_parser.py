import requests
from bs4 import BeautifulSoup

link = ''
link_base = 'https://www.tasteofhome.com/search/index?search='
link_query_conditions = '&st=2&rm=0&vw=1&page=1&rm=2&sort=0'
recipe_list = ["chicken", "tikka", "masala"]
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

recipe_ingreidents = dict()

for link in recipes_links:
	recipe_page = requests.get(link)
	recipe_soup = BeautifulSoup(recipe_page.content, 'html.parser')
	ingredients = list()
	for ingredient_list in recipe_soup.find_all('ul', {"class": "recipe-ingredients__list"}):
		for i in ingredient_list.findAll('li'):
			ingredients.append(i.get_text())
	recipe_ingreidents[link] = ingredients

print(recipe_ingreidents)


	
	

