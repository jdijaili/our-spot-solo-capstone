from .db import db

class ParkListJoin(db.Model):
    __tablename__ = 'park_list_joins'

    id = db.Column(db.Integer, primary_key=True)
    park_id = db.Column(db.Integer, nullable=False)
    list_id = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text)

    def to_JSON(self):
        return {
            'id': self.id,
            'park_id': self.park_id,
            'list_id': self.list_id,
            'notes': self.notes
        }


park_lists = db.Table(
    "park_lists",
    db.Column(
        "park_id",
        db.Integer,
        db.ForeignKey("parks.id"),
        primary_key=True
    ),
    db.Column(
        "list_id",
        db.Integer,
        db.ForeignKey("lists.id"),
        primary_key=True
    )
)
