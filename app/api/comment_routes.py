from asyncio.proactor_events import constants
from crypt import methods
from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import JSON
from app.models import db, Comment, User

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    comment_user_query = db.session.query(Comment, User).select_from(Comment).join(User).all()
    print(comment_user_query[0])
    print(str(comment_user_query[0][1]))
    for comment in comments:
        for c, u in comment_user_query:
            if (u.id == comment.user_id):
                comment.username = u.username

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
        user_query = db.session.query(Comment, User).filter(Comment.user_id == User.id).all();

        comment.username = user_query[0][1].username

        return comment.to_JSON()
    else:
        return make_response({'errors': 'Error(s) on the comment occured'})
