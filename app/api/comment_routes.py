from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import JSON
from app.models import db, Comment, User

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    comment_user_query = db.session.query(Comment, User).select_from(Comment).join(User).all()
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

    if comment:
        db.session.add(comment)
        db.session.commit()
        user_query = db.session.query(Comment, User).select_from(Comment).join(User).filter(Comment.id == comment.id).all()

        comment.username = user_query[0][1].username

        return comment.to_JSON()
    else:
        return make_response({'errors': 'Error(s) on the comment occured'})

@comment_routes.route('/<int:park_id>', methods=['PUT'])
def edit_comment(park_id):
    id = request.json["id"]
    comment = db.session.query(Comment).filter(Comment.id == id).one()
    user_query = db.session.query(Comment, User).select_from(Comment).join(User).filter(Comment.id == comment.id).all()
    comment.username = user_query[0][1].username

    if comment:
        comment.commentText = request.json["commentText"]
        db.session.commit()
        return comment.to_JSON()
    else:
        return make_response({"errors": ["Edit on non-existent comment"]})

@comment_routes.route('/', methods=['DELETE'])
def delete_comment():
    id = request.json["id"]
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {"errors": False}
    else:
        return make_response({"errors": ["Delete on non-existent comment"]})
