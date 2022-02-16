from .db import db
from .park_list_join import park_lists

class Park(db.Model):
    __tablename__ = 'parks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=False)
    imageURL = db.Column(db.String, nullable=False)

    lists = db.relationship('List', secondary=park_lists, back_populates='parks')
    comments = db.relationship('Comment', back_populates='park')
    favorites = db.relationship('Favorite', back_populates='park')
    park_photos = db.relationship('Park_Photo', back_populates='park')

    def to_JSON(self):
        return {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'state': self.state,
            'description': self.description,
            'imageURL': self.imageURL
        }
