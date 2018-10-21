from flask import Flask, request
import requests
import os 
import json

# defining constants
dir_path = os.path.dirname(os.path.realpath(__file__))
api = 'https://api.rev.ai/revspeech/v1beta/jobs'
headers = {'Authorization': 'Bearer 01VmSSrU2Aq9BPfkNQP-hyMJIS2XLbUGd9BIehO3mOX562Ujei7618lpRzu4G0EZMvUpcq4Bf4AKzYA2c7WWo2zlPLcEc'}
speechFolder = 'SpeechFiles/'

app = Flask(__name__)

@app.route("/")
def lit():
    return "LITTTTT! This is bad ass"

@app.route("/find", methods=['GET', 'POST'])
def find():
    if request.method == 'POST':
        speech_bin = request.files['speech']
        files = {'media': ('voiceInputFromClient.mp3', speech_bin, 'audio/mp3')}

        r = requests.post(api, headers=headers, files=files)
        r = json.loads(r.content)
        print(r)
        if waitForTranscription(r['id']):
            return processTranscript(getTranscript(r['id']))

        return "Waitin failed!"
    return "ripppp"
    

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
            return processTranscript(getTranscript(r['id']))

        return "Waitin failed!"

def processTranscript(transcript):
    res = []
    for t in transcript['monologues'][0]['elements']:
        if t['type'] == 'text':
            res.append(t['value'])
    return ' '.join(res)


def waitForTranscription(rid):
    print(rid)
    url = api + "/" + str(rid)
    status = requests.get(url, headers = headers, params={'id': str(rid)})
    status = json.loads(status.content)
    print(status)
    # if str(status.status_code) == '200':
    while status['status'] == 'in_progress':
        status = requests.get(url, headers = headers, params={'id': str(rid)})
        status = json.loads(status.content)
    return True
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