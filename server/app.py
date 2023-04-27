from flask import Flask, jsonify, request
from flask_cors import CORS
import youtube_transcript_api

app = Flask(__name__)
CORS(app)

@app.route('/api/transcript/<video_id>', methods=['GET'])
def get_transcript(video_id):
    try:
        transcript = youtube_transcript_api.YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = ' '.join([entry['text'] for entry in transcript])
        return jsonify(transcript_text)
    except youtube_transcript_api.CouldNotRetrieveTranscript:
        return "Could not retrieve transcript", 404

if __name__ == '__main__':
    app.run(debug=True)
