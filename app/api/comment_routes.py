from asyncio.proactor_events import constants
from crypt import methods
from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import JSON
from app.models import db, Comment, User

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
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
        # username_query = db.session.query(Comment, User).filter(Comment.user_id == User.id).all();
        # print('!!!!!!!!!!!!')
        # print(username_query)

        return comment.to_JSON()
    else:
        return make_response({'errors': 'Error(s) on the comment occured'})
