from app.models import db, List, Park, Park_List_Join

def seed_lists():
    mission_district = List(
        user_id=1,
        title='mission district',
        description='fun spots in the mission~'
    )

    dolores_park = Park.query.get(1)
    mission_district.parks.append(dolores_park)
    db.session.add(mission_district)
    db.session.commit()

def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
