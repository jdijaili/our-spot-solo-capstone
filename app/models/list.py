from .db import db
from park_list_join import park_lists

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text)

    user = db.relationship('User', back_populates='list')
    parks = db.relationship('Park', secondary=park_lists, back_populates='lists')
