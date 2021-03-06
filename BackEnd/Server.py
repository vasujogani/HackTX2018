from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import json
import ingredient_parser as ing_par
from py_edamam import Edaman
import database
import random


# defining constants
dir_path = os.path.dirname(os.path.realpath(__file__))
api = 'https://api.rev.ai/revspeech/v1beta/jobs'
headers = {'Authorization': 'Bearer 01VmSSrU2Aq9BPfkNQP-hyMJIS2XLbUGd9BIehO3mOX562Ujei7618lpRzu4G0EZMvUpcq4Bf4AKzYA2c7WWo2zlPLcEc'}
speechFolder = 'SpeechFiles/'
exists = []

app = Flask(__name__)
CORS(app)

@app.route("/")
def lit():
    return "LITTTTT! This is bad ass"

@app.route("/food", methods=['GET', 'POST'])
def foodWithPantry():
    print('pantry')
    e = Edaman(nutrition_appid='32d74c57',
        nutrition_appkey='08367fc836fe9426bf2213e98f72127e',
        recipes_appid='d8236e65',
        recipes_appkey='dcdcda67cd3d123a9cdad0f2c7cda701	')

    exists = database.user_inventory()
    print(exists)
    s = ''
    for i in range(min(5, len(exists))):
        s+= exists[i] + ' '

    result = e.search_recipe(s)
    ind = random.randint(0,len(result)-1)
    print(list(result.keys())[ind])
    return jsonify(ing_par.get_recipe_info(list(result.keys())[0].split(' ')))


@app.route("/process", methods=['GET', 'POST'])
def process():
    if request.method == 'POST':
        print("processing...")
        speech_text = request.form.get('speech')
        res = ing_par.find_recipes(speech_text)
        print(res)
        return jsonify(res)
    else:
        res = {'error': 'GET request made instead of POST for PROCESS'}
        return jsonify(res)

@app.route("/find", methods=['GET', 'POST'])
def find():
    # if request.method == 'POST':
    #     return jsonify({'test': 'does it work'})
    if request.method == 'POST':
        print('finding...')
        speech_bin = request.files['speech']
        files = {'media': ('voiceInputFromClient.mp3', speech_bin, 'audio/mp3')}

        r = requests.post(api, headers=headers, files=files)
        r = json.loads(r.content)
        print("o shit waddup: " + str(r))
        if waitForTranscription(r['id']):
            print('before x')
            x = processTranscript(getTranscript(r['id']))
            print('print x after this')
            print(x)
            return jsonify({'result': x})
        print('waiting failedddd')
        return jsonify({'error': 'Processing failed!'})
    return jsonify({'error': 'ripppp'})


@app.route("/sample/<int:rid>", methods=['GET'])
def getJob(rid):
    # get file name
    name = 'sample' + str(rid) + '.mp3'
    filename = speechFolder + name
    files = {}
    with open(filename, 'rb') as f:
        files = {'media': (name, f, 'audio/mp3')}

        r = requests.post(api, headers=headers, files=files)
        r = json.loads(r.content)

        print(r)
        if waitForTranscription(r['id']):
            print("Waiting DONE!!!! " + str(rid))
            x = processTranscript(getTranscript(r['id']))
            return {'result': x}

        return "Processing Failed!"

def processTranscript(transcript):
    res = []
    print("PROCESS: " + str(transcript))
    if len(transcript['monologues']) == 0:
        return 'Could not process (processTranscript)'
    for t in transcript['monologues'][0]['elements']:
        if t['type'] == 'text':
            res.append(t['value'])
    return ' '.join(res)


def waitForTranscription(rid):
    print(rid)
    url = api + "/" + str(rid)
    status = requests.get(url, headers = headers, params={'id': str(rid)})
    status = json.loads(status.content)
    print("we entering: " + str(status))
    # if str(status.status_code) == '200':
    while status['status'] == 'in_progress':
        print("we in this bitch")
        status = requests.get(url, headers = headers, params={'id': str(rid)})
        status = json.loads(status.content)
    print(status['status'])
    if status['status'] == 'transcribed':
        return True
    return False
    # return False


def getTranscript(rid):
    url = api + "/{_id}/transcript".format(_id=rid)
    response = requests.get(url, headers = {'Accept': 'application/vnd.rev.transcript.v1.0+json', 'Authorization': headers['Authorization']}, params = {'id': str(rid)})
    response = json.loads(response.content)
    return response

def checkStatus(id):
    r = requests.post(api + '/' + id, headers=headers)


if __name__ == "__main__":
    app.run()
