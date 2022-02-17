from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    park_id = db.Column(db.Integer, db.ForeignKey('parks.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reply = db.Column(db.Integer)
    commentText = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    park = db.relationship('Park', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'park_id': self.park_id,
            'user_id': self.user_id,
            'reply': self.reply,
            'commentText': self.commentText,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def to_JSON(self):
        return {
            'id': self.id,
            'parkId': self.park_id,
            'userId': self.user_id,
            'reply': self.reply,
            "username": self.username,
            'commentText': self.commentText,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
