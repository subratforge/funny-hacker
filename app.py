from flask import Flask, render_template, request
import random

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# Number Guessing Game
secret = random.randint(1, 10)

@app.route("/guess", methods=["GET", "POST"])
def guess():
    message = ""
    if request.method == "POST":
        num = int(request.form["number"])
        if num == secret:
            message = "🎉 Correct! You guessed it!"
        elif num < secret:
            message = "📉 Too low!"
        else:
            message = "📈 Too high!"
    return render_template("guess.html", message=message)

# Dino Game Page
@app.route("/dino")
def dino():
    return render_template("dino.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)