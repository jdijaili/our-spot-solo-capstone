from app.models import db, List, Park

def seed_lists():
    mission_district = List(
        user_id=1,
        title='mission district',
        description='fun spots in the mission~'
    )

    favs = List(
        user_id=1,
        title='favs',
        description='all the favs'
    )

    dolores_park = Park.query.get(1)
    mission_district.append(dolores_park)
    favs.parks.append(dolores_park)

    db.session.add(mission_district)
    db.session.add(favs)
    db.session.commit()

def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
