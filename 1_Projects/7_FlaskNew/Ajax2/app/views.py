from flask import  Flask, render_template, request, jsonify, make_response
import requests
from app import app
import os
from datetime import datetime


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/convert", methods=["POST"])
def convert(): 
    currency = request.form.get("currency")
    res = requests.get("https://api.exchangeratesapi.io/latest?symbols=USD," + str(currency))
    #Check for success
    if res.status_code != 200:
        return jsonify({"success": False})
    data = res.json()
    return jsonify({"success": True, "rate": data})
