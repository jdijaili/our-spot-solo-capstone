from crypt import methods
from flask import Blueprint, jsonify, make_response, request
from app.models import db, List, Park
from app.forms import ListForm
from datetime import datetime

list_routes = Blueprint('lists', __name__)

# list CRUD
@list_routes.route('/user/<int:user_id>', methods=['GET'])
def get_all_lists(user_id):
    lists = List.query.filter(List.user_id == user_id)
    return jsonify([list.to_JSON() for list in lists])

@list_routes.route('/<int:list_id>')
def get_list(list_id):
    list = List.query.get(list_id)
    return list.to_JSON()

@list_routes.route('/<int:list_id>/get-parks')
def get_parks_for_list(list_id):
    park_list = List.query.get(list_id)
    return jsonify([park.to_JSON() for park in park_list.parks])

@list_routes.route('/', methods=['POST'])
def post_list():
    new_list = List(
        user_id=request.json['user_id'],
        title=request.json['title'],
        description=request.json['description'],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    if new_list:
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_JSON()
    else:
        return make_response({'errors': 'Error(s) on the list occured'})

@list_routes.route('/edit-list', methods=['PUT'])
def edit_list():
    id = request.json['id']
    list = db.session.query(List).filter(List.id == id).one()

    if list:
        list.title = request.json['title']
        list.description = request.json['description']
        db.session.commit()
        return list.to_JSON()
    else:
        return make_response({"errors": ["Edit on non-existent list"]})

@list_routes.route('/delete-list', methods=['DELETE'])
def delete_list():
    id = request.json['list_id']
    list = List.query.get(id)

    if list:
        db.session.delete(list)
        db.session.commit()
        return {'errors': False}
    else:
        return make_response({"errors": ["Delete on non-existent list"]})

# list park references
@list_routes.route('/add-park-ref', methods=['POST'])
def add_park_to_list():
    list = List.query.get(request.json['list_id'])
    park = Park.query.get(request.json['park_id'])

    if list and park:
        list.parks.append(park)
        db.session.commit()
        return list.to_JSON()


# remove park from list
@list_routes.route('/<int:list_id>', methods=['DELETE'])
def delete_park_from_list(list_id):
    list = List.query.get(list_id)
    park = Park.query.get(request.json['park_id'])

    if list and park:
        list.parks.remove(park)
        db.session.commit()
        return park.to_JSON()
    else:
        return make_response({"errors": ["Delete on non-existent park"]})
