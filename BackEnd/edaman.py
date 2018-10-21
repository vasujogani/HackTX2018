from py_edamam import Edaman
import re


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

    # for w in ing.split(" ")
    # return ing



e = Edaman(nutrition_appid='32d74c57',
           nutrition_appkey='08367fc836fe9426bf2213e98f72127e',
           recipes_appid='d8236e65',
           recipes_appkey='dcdcda67cd3d123a9cdad0f2c7cda701	')
# exists = getInventory()
# print e.search_nutrient("1 large pepporini pizza")
s = ''
for i in range(min(5, len(exists))):
    s+= exists[i] + ' '
result = e.search_recipe(s)


# print(result)
# for k in result:
for k in result['Parmesan Chicken Nuggets']['ingredients']:
#     cautions
    print (cleanIngredient(k))
    # print(k)
#     print(result['Chicken Parmesan recipes']['nutrients'])
# print (e.search_food("chicken"))
# print e.pretty_nutrient("10 gram of cheese")