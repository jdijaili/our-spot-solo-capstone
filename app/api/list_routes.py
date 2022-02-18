from flask import Blueprint, jsonify, make_response, request
from app.models import db, List

list_routes = Blueprint('lists', __name__)

@list_routes.route('/')
def get_lists():
    user_id = request.json['id']
    park_id = request.json['parkId']
    lists = List.query.filter(List.user_id == user_id)
    return jsonify([list.to_JSON() for list in lists])
