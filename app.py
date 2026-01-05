from flask import Flask, render_template, request, session, redirect, url_for
import random

app = Flask(__name__)
app.secret_key = "dev-secret-change-this"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/guess", methods=["GET", "POST"])
def guess():
    # Reset game if user asked
    if request.args.get("reset"):
        session.pop("secret", None)
        session.pop("attempts", None)
        return redirect(url_for("guess"))

    message = ""
    # Ensure a secret number exists for this session
    if session.get("secret") is None:
        session["secret"] = random.randint(1, 10)
        session["attempts"] = 0

    if request.method == "POST":
        try:
            num = int(request.form.get("number", ""))
        except ValueError:
            message = "Please enter a valid number."
            return render_template("guess.html", message=message, attempts=session.get("attempts", 0))

        session["attempts"] = session.get("attempts", 0) + 1
        secret = session.get("secret")

        if num == secret:
            attempts = session.get("attempts", 1)
            message = f"🎉 Correct! You guessed it in {attempts} attempts!"
            session.pop("secret", None)
            session.pop("attempts", None)
        elif num < secret:
            message = "📉 Too low!"
        else:
            message = "📈 Too high!"

    return render_template("guess.html", message=message, attempts=session.get("attempts", 0))

# Dino Game Page
@app.route("/dino")
def dino():
    return render_template("dino.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)