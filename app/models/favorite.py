from .db import db

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    park_id = db.Column(db.Integer, nullable=False)

    park = db.relationship('Park', back_populates='favorites')

    def to_JSON(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'park_id': self.park_id
        }
