import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'hacktx2018-74372e77e505.json'

# Use the application default credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
  'projectId': 'hacktx2018-e7f10',
})

db = firestore.client()

def database():
    return db

docs = db.collection('common_ingredients').get()


doc_ref = db.collection('common_ingredients').document('cumin')

# # try:
# doc = doc_ref.get()
# if doc.to_dict() is not None:
#     print(u'Document{} data: {}'.format(doc_ref.id ,doc.to_dict()))

# except google.cloud.exceptions.NotFound:
#     print(u'No such document!')

# words_remove = {
#     'oz':1,
#     'ounce':1,
#     'ounces':1,
#     'teaspoon':1,
#     'teaspoons':1,
#     'tablespoon':1,
#     'tablespoons':1,
#     'cup':1,
#     'cups':1,
#     'pint':1,
#     'pints':1,
#     'cooked':1,
#     'inch':1,
#     'pound':1,
#     'pounds':1,
# }

# for doc in docs:
#     print(doc.id)

# with open("food-related.csv", 'rb') as f:
#     for line in f:
#         word_to_add = str(line)[3:-6]
#         if word_to_add not in words_remove.keys():
#             db.collection('common_ingredients').document(word_to_add).set({})
