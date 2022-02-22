from .db import db
from .park_list_join import park_lists
from datetime import datetime

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='list')
    parks = db.relationship('Park', secondary=park_lists, back_populates='lists')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'parks': self.parks,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def to_JSON(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
