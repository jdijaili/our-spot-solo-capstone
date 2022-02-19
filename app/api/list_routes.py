from flask import Blueprint, jsonify, make_response, request
from app.models import db, List, Park
from app.seeds import lists

list_routes = Blueprint('lists', __name__)

@list_routes.route('/')
def get_lists():
    print('get route')
    park_lists = List.query.all()
    # park_lists = List.query.filter(List.list_id == list_id).all()
    # park_lists = List.query.filter(List)
    print(park_lists)
    print([list.to_JSON() for list in park_lists])
    # print([list.to_dict() for list in lists])
    return jsonify([list.to_JSON() for list in park_lists])
