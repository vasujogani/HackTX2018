import requests
import os

# id = 1
base_url = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases"
access_token = "dd9c62a6c2ee419badb6ec1101862acf"


url_headers = {
    "Ocp-Apim-Subscription-Key": access_token,
    "Content-Type": "application/json"
}


def analyze_text(text):
    documents = {
        'documents': [
            {'id': '1', 'language': 'en', 'text': text}
        ]
    }

    resp = requests.post(base_url, json = documents, headers=url_headers)
    text_info = resp.json()
    ret = []
    key_phrases = text_info["documents"][0]["keyPhrases"]
    for k in key_phrases:
        for token in k.split():
            ret.append(token)
    return ret





######
#assume that rev ai gives me line of text
######




# send text to azure text analysis api
# later: maybe refine search/ask for any specifications
# get key words, use bing search api

# web scrape ingredients

# source grocery stores/markets and compile/compare prices
