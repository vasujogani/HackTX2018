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

docs = db.collection('ingredients').get()
for doc in docs:
    print(doc.id)
