from .db import db

class ParkListJoin(db.Model):
    __tablename__ = 'park_list_joins'

    id = db.Column(db.Integer, primary_key=True)
    park_id = db.Column(db.Integer, nullable=False)
    list_id = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text)


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
