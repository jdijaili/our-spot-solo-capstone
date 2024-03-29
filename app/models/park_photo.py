from .db import db
from datetime import datetime

class Park_Photo(db.Model):
    __tablename__ = 'park_photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    park_id = db.Column(db.Integer, db.ForeignKey('parks.id'), nullable=False)
    imageURL = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='park_photos')
    park = db.relationship('Park', back_populates='park_photos')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'park_id': self.park_id,
            'imageURL': self.imageURL,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def to_JSON(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'parkId': self.park_id,
            'imageURL': self.imageURL,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
