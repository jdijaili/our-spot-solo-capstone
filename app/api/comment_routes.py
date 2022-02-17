from flask import Blueprint, jsonify
from app.models import Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes('/<int:park_id>')
def get_comments(park_id):
    comments = Comment.query.filter(Comment.id == park_id)
    return jsonify([comment.to_JSON() for comment in comments])
