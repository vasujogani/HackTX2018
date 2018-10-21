from py_edamam import Edaman

e = Edaman(nutrition_appid='32d74c57',
           nutrition_appkey='08367fc836fe9426bf2213e98f72127e',
           recipes_appid='d8236e65',
           recipes_appkey='dcdcda67cd3d123a9cdad0f2c7cda701	')

# print e.search_nutrient("1 large apple")
result = e.search_recipe("chicken kale spinach")
# for k in result:
    # cautions
    # print (k)
    # print(result['Chicken Parmesan recipes']['nutrients'])
# print (e.search_food("chicken"))
print e.pretty_nutrient("10 gram of cheese")