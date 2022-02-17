from crypt import methods
from flask import Blueprint, jsonify
from app.models import Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:park_id>')
def get_comments(park_id):
    comments = Comment.query.filter(Comment.id == park_id)
    return jsonify([comment.to_JSON() for comment in comments])

@comment_routes.route('/<int:park_id>', methods=['POST'])
def post_comment(park_id):
    
