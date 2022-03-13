import requests
import time
import gcptextsentiment

endpoint = "https://api.assemblyai.com/v2/transcript"

json = {
  "audio_url": "https://storage.googleapis.com/hackybucket/recording2.wav"
}

headers = {
    "authorization": "5240193dbe964e3cbaa210cbaaba108f",
    "content-type": "application/json"
}

response = requests.post(endpoint, json=json, headers=headers)

print(response.json())
tid = response.json()['id']


endpoint = "https://api.assemblyai.com/v2/transcript/" + tid

headers = {
    "authorization": "5240193dbe964e3cbaa210cbaaba108f",
}

response = requests.get(endpoint, headers=headers)

print(response.json())

status = response.json()['status']

while status != "completed":
    response = requests.get(endpoint, headers=headers)

    status = response.json()['status']
    time.sleep(3)

text = response.json()['text']

print("done.. the result is ")
print (text)

results = gcptextsentiment.sample_analyze_sentiment(text)
print("text sentiment analysis gives us... ")
print (results)

