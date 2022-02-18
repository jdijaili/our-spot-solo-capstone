from flask import Blueprint, jsonify, make_response, request
from app.models import db, List, Park

list_routes = Blueprint('lists', __name__)

@list_routes.route('/')
def get_lists():
    user_id = request.json['id']
    park_id = request.json['parkId']
    # lists = List.query.filter(List.user_id == user_id).first()
    # lists = List.query.join(Park.name, Park.city, Park.imageURL).filter_by(List.user_id == user_id).all()
    lists = List.query.join(Park).filter_by(List.user_id == user_id).all()
    return jsonify([list.to_JSON() for list in lists])
