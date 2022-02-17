from crypt import methods
from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import JSON
from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:park_id>')
def get_comments(park_id):
    comments = Comment.query.filter(Comment.id == park_id)
    return jsonify([comment.to_JSON() for comment in comments])

@comment_routes.route('/<int:park_id>', methods=['POST'])
def post_comment(park_id):
    comment = Comment(
        park_id=park_id,
        user_id=request.json['user_id'],
        reply=request.json['reply'],
        commentText=request.json['commentText']
    );

    if (comment):
        db.session.add(comment)
        db.session.commit()
        return comment.to_JSON()
    else:
        return make_response({'errors': 'Error(s) on the comment occured'})
