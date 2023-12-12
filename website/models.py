from . import db 
from flask_login import UserMixin
from sqlalchemy.sql import func



class Candidate(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    name = db.Column(db.String(150))
    contact = db.Column(db.String(150), unique = True)
    email_add = db.Column(db.String(150), unique = True)
    notes = db.Column(db.String(1500))
    #file_type = db.Column(db.String(150))
    date_added = db.Column(db.DateTime(timezone=True), default=func.now())
    file_path = db.Column(db.String(10000)) #Resume


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(150), unique = True)
    fullname = db.Column(db.String(150))
    password = db.Column(db.String(150))
    candidates = db.relationship("Candidate")   #Collection of candidates

