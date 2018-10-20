import requests
import json
import time

url = "https://api.rev.ai/revspeech/v1beta/jobs"
data = {"media_url": "https://support.rev.com/hc/en-us/article_attachments/200043975/FTC_Sample_1_-_Single.mp3",
        "metadata": "This is a sample submit jobs option"}
# callback = "https://www.example.com/callback"
headers = {"Authorization": "Bearer 01x_We_kYHsVnoJnVWfrJIfrzPsLSvmTDmOJcg3_XsLTsX9OV_GglZA6RMz4ohUl2BkKMjDrZjb_HgszMnzKY0S3RjHjU",
            "Content-Type": "application/json"}

res = requests.post(url, json=data, headers=headers)
print("Got ID response from rev.ai")
text = json.loads(res.text)
req_id = text["id"]

param = {"id": str(req_id)}
print("Waiting to get the transcript...")
start = time.time()

# check the status until the transcript is ready
stat_url = "https://api.rev.ai/revspeech/v1beta/jobs/" + str(req_id)
stat_headers = {"Authorization": "Bearer 01x_We_kYHsVnoJnVWfrJIfrzPsLSvmTDmOJcg3_XsLTsX9OV_GglZA6RMz4ohUl2BkKMjDrZjb_HgszMnzKY0S3RjHjU"}
res = requests.get(stat_url, headers=stat_headers, params=param)
stat = json.loads(res.text)["status"]
while stat == "in_progress":
    res = requests.get(stat_url, headers=stat_headers, params=param)
    stat = json.loads(res.text)["status"]
end = time.time()


get_url = "https://api.rev.ai/revspeech/v1beta/jobs/" + str(req_id) + "/transcript"
get_headers = {"Authorization": "Bearer 01x_We_kYHsVnoJnVWfrJIfrzPsLSvmTDmOJcg3_XsLTsX9OV_GglZA6RMz4ohUl2BkKMjDrZjb_HgszMnzKY0S3RjHjU",
                "Accept": "text/plain"}
res = requests.get(get_url, headers=get_headers, params=param)
print("Transcript received! Elapsed time: " + str(end - start))
print(res.text)