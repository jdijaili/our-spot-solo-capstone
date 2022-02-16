from app.models import db, Park

def seed_parks():
    dolores = Park(
        name='Mission Dolores Park',
        city='San Francisco',
        state='California',
        description='This San Francisco classic brings is a hot spot for picnics & people-watching.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645045904/our-spot/dolorspark_jx0o3k.jpg'
    )

    alta_plaza = Park(
        name='Alta Plaza Park',
        city='San Francisco',
        state='California',
        description='Alta Plaza is known for its panoramic view of the city. There\'s a playground, tennis court, and grand staircase that rises to a central plateau to admire the view from.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645045904/our-spot/alta-plaza_ta47fr.jpg'
    )

    alamo_square = Park(
        name='Alamo Square Park',
        city='San Francisco',
        state='California',
        description='A beloved neighborhood park that houses the "Painted Ladies", well known for its appearances in movies and tv shows.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645045904/our-spot/Alamo-Sq_odqstp.jpg'
    )

    db.session.add(dolores)
    db.session.add(alta_plaza)
    db.session.add(alamo_square)

    db.session.commit()

def undo_parks():
    db.session.execute('TRUNCATE parks RESTART IDENTITY CASCADE;')
    db.session.commit()
