from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.json
    return jsonify({ "suggestion": "Reduce material by 15%" })

if __name__ == '__main__':
    app.run(port=5001)
