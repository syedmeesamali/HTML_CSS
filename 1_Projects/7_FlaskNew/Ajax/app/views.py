from flask import  Flask, render_template, request, jsonify
from app import app
import os
from datetime import datetime
import sqlite3

form_data = "./form_data.db"

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/save_form', methods=['POST'])
def save_form(): 
    try:
        Name = request.form.get('name')
        Email = request.form.get('email')
        Title = request.form.get('title')
        Message = request.form.get('message')
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        conn = sqlite3.connect(form_data)
        cur = conn.cursor()
        cur.execute("INSERT INTO form_data (Name, Email, Title, Message, Date) VALUES(?, ?, ?, ?, ?)" ,(Name, Email, Title, Message, timestamp))
        conn.commit()
        return jsonify({"success": True})
    except:
        conn.rollback()
        return jsonify({"success": False})
    conn.close()