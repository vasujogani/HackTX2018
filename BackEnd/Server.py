from flask import Flask
import requests
import os 

# defining constants
dir_path = os.path.dirname(os.path.realpath(__file__))
api = 'https://api.rev.ai/revspeech/v1beta/jobs'
headers = {'Authorization': 'Bearer 01VmSSrU2Aq9BPfkNQP-hyMJIS2XLbUGd9BIehO3mOX562Ujei7618lpRzu4G0EZMvUpcq4Bf4AKzYA2c7WWo2zlPLcEc'}
speechFolder = 'SpeechFiles/'

app = Flask(__name__)

@app.route("/")
def lit():
    return "LITTTTT! This is bad ass"

@app.route("/sample/")
def samp1():
    # get file name
    name = 'sample1.mp3'
    filename = speechFolder + name
    with open(filename, 'rb') as f:
        files = {'media': (name, f, 'audio/mp3')}
        r = requests.post(api, headers=headers, files=files)

    return str(r.content)

if __name__ == "__main__":
    app.run()