from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required, current_user
from .models import Candidate
from . import db
from website import create_app
import json


from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os


views = Blueprint("views", __name__)
#Blueprint means it contains a bunch of routes inside it

# Temporary cache to store generated codes until they are verified
code_cache = {}


# class UploadFileForm(FlaskForm):
#     file = FileField("File", validators=[InputRequired()])
#     submit = SubmitField("Upload File")


@views.route('/profile', methods=["GET", "POST"])
@login_required
def profile():
    return render_template('profile.html', user = current_user)


@views.route('/candidates', methods=["GET", "POST"])
@login_required
def candidates():
    return render_template('candidates.html', user = current_user)


@views.route("/add-candidate", methods=["POST"])
@login_required
def addCandidate():
    data = json.loads(request.data)
    print("Weldone....")
    existing_candidate = Candidate.query.filter_by(email_add=data['email']).first()
    message=""
    
    if existing_candidate:
        message = "Candidate already exists."
        return render_template("candidates.html", user=current_user, msg=message)


    candidate = Candidate(user_id=current_user.id, name=data['name'], contact=data['contact'], email_add=data['email'], notes=data['notes'])
    db.session.add(candidate)
    db.session.commit()

    return render_template("candidates.html", user=current_user, msg=message)

@views.route("/update-notes", methods=["POST", 'GET'])
@login_required
def updateNotes():
    data = json.loads(request.data)
    candidate = Candidate.query.filter_by(id=data['id']).first()
    message = ""
    print(data["notes"])
    if candidate:
        candidate.notes = data["notes"]
        db.session.commit()
        print("Notes updated")
        message = "Notes successfully updated"

    else:
        message = "Candidate Does not exist in database"
    return render_template("candidates.html", user=current_user, msg=message)

@views.route("/update-candidate", methods=["POST", 'GET'])
@login_required
def updateCandidate():
    data = json.loads(request.data)
    candidate = Candidate.query.filter_by(id=data["id"]).first()
    message=""

    if candidate:
        candidate.name = data["name"]
        candidate.contact = data["contact"]
        candidate.email_add = data["email"]
        db.session.commit()
        message = "Candidate Successfully Uodated"
        print("Candidate Updated")

    else:
        print("Cannot update Candidate")
        message = "Cannot update Candidate"

    return render_template("candidates.html", user=current_user, msg=message)


@views.route("/delete-candidate", methods=["POST"])
@login_required
def deleteCandidate():
    data = json.loads(request.data)
    candidateID = data["candidateID"]
    candidate = Candidate.query.get(candidateID)
    
    if candidate:
        if candidate.user_id == current_user.id:
            db.session.delete(candidate)
            db.session.commit()
            print("Deleted")
            
    return render_template("candidates.html", user=current_user)

